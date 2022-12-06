import { ISocketService } from "../ISocket.service";
import MessageService from "./Message.service";

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
      console.log("Join vao group", groups);
      this.socket.join(groups);
      this.socket.on("groupchat:sendMess", this.sendMessengerToGroup);
    });
  }
  sendMessengerToGroup({ content, to, from }: any): any {
    io.in(to).emit(`serverGroupChat:sendMess-${to}`, "du lieu tra ve ne");
    console.log(content, to, from);
  }
}

export default SocketService;
