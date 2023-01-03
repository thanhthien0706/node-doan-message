import { ISocketService } from "../ISocket.service";
import MessageService from "./Message.service";
import CloudinaryService from "./Cloudinary.service";
import { Types } from "mongoose";
import { createMessageDTO } from "../../dto/request/MessageDTO";
import { type } from "os";
import fs from "fs";

let io: any;
let listUserPeers: UserPeer[] = [];
let socketId = "";
let socketExtenal: any = null;

interface UserPeer {
  idUser: string;
  idPeer: string;
  idSocket: string;
}

interface ExtendedUserPeer extends UserPeer {
  idSocketCaller: string;
}

class SocketService implements ISocketService {
  socket: any;

  constructor(ioM: any, socket: any) {
    io = ioM;
    this.socket = socket;
    socketId = this.socket.id;
    socketExtenal = this.socket;

    this.initMain();
  }
  initMain() {
    this.socket.on("disconnect", () => {
      const listExist = listUserPeers.filter((item) => {
        return item.idSocket !== this.socket.id;
      });

      listUserPeers = listExist;
    });
    this.socket.on("groupchat:join", (groups: any) => {
      this.socket.join(groups);
    });
    this.socket.on("groupchat:sendMess", this.sendMessengerToGroup);
    this.socket.on("clientSubscribePeerId", this.clientSubscribePeerId);
    this.socket.on("client:getDataPeerId", ({ idMe, listIdUser }: any) => {
      let listIdResult: any = [];
      listIdUser.forEach((item: any) => {
        const inforUser: any = listUserPeers.filter((e) => e.idUser === item);

        if (inforUser.length > 0) {
          const inforUserCaller: any = listUserPeers.filter(
            (el) => el.idUser == idMe
          );

          const dataUserCallee = {
            idUser: inforUser[0].idUser,
            idPeer: inforUser[0].idPeer,
            idSocket: inforUser[0].idSocket,
          };

          // const dataUserCaller = {
          //   idUser: inforUserCaller[0].idUser,
          //   idPeer: inforUserCaller[0].idPeer,
          //   idSocket: inforUserCaller[0].idSocket,
          // };

          // io.to(dataUserCallee.idSocket).emit(
          //   "serverSendInforCaller",
          //   inforUserCaller[0]
          // );
          listIdResult.push(dataUserCallee);
        }
      });

      socketExtenal.emit(`serverSendIdPeers-${idMe}`, listIdResult);
    });
    this.socket.on("closeCall", ({ to }: any) => {
      console.log(to);
      io.to(to).emit("serverSendCloseCall");
    });
  }
  async sendMessengerToGroup({ data }: any) {
    const messModel: createMessageDTO = {
      content: data.content as string,
      type: data.type as string,
      conversation: new Types.ObjectId(data.conversation as string),
      attachment: null,
      sender: new Types.ObjectId(data.sender),
    };

    if (data.attachment && data.type == "IMAGE") {
      const fileUpload = await CloudinaryService.uploadFileBuffer(
        data.attachment
      );
      messModel.attachment = fileUpload.url;
    } else if(data.attachment && data.type == "FILE") {
      fs.writeFileSync(`./src/public/files/${data.fileName}`, data.attachment);

      const url = `http://localhost:3000/files/${data.fileName}`;
      messModel.attachment = url;
    }

    const mess = await MessageService.createMessage(messModel);
    const resultMess = await MessageService.getOneMessage(mess._id);

    io.in(data.conversation).emit(
      `serverGroupChat:sendMess-${data.conversation}`,
      resultMess[0]
    );
  }

  clientSubscribePeerId({ idUser, idPeer }: any) {
    const checkExist = listUserPeers.filter((item) => {
      return item.idUser === idUser;
    });

    if (checkExist.length <= 0) {
      listUserPeers.push({ idUser, idPeer, idSocket: socketId });
    }
  }
}

export default SocketService;
