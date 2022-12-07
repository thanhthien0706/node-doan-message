import { ISocketService } from "../ISocket.service";
import MessageService from "./Message.service";
import CloudinaryService from "./Cloudinary.service";
import { Types } from "mongoose";
import { createMessageDTO } from "../../dto/request/MessageDTO";

let io: any;

class SocketService implements ISocketService {
  socket: any;

  constructor(ioM: any, socket: any) {
    io = ioM;
    this.socket = socket;

    this.initMain();
  }
  initMain() {
    this.socket.on("groupchat:join", (groups: any) => {
      this.socket.join(groups);
    });
    this.socket.on("groupchat:sendMess", this.sendMessengerToGroup);
  }
  async sendMessengerToGroup({ data }: any) {
    const messModel: createMessageDTO = {
      content: data.content as string,
      type: data.type as string,
      conversation: new Types.ObjectId(data.conversation as string),
      attachment: null,
      sender: new Types.ObjectId(data.sender),
    };

    if (data.attachment) {
      const fileUpload = await CloudinaryService.uploadFileBuffer(
        data.attachment
      );
      messModel.attachment = fileUpload.url;
    }

    const mess = await MessageService.createMessage(messModel);
    const resultMess = await MessageService.getOneMessage(mess._id);

    io.in(data.conversation).emit(
      `serverGroupChat:sendMess-${data.conversation}`,
      resultMess[0]
    );
  }
}

export default SocketService;
