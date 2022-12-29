import socketio from "socket.io";
import SocketService from "../service/ipml/Socket.service";

let io: any = null;

class SocketSetup {
  constructor(server: any) {
    this.initMain(server);
  }
  initMain(server: any) {
    io = require("socket.io")(server, {
      cors: {
        origin: "*",
      },
    });
    io.on("connection", this.handleConnections);
  }
  handleConnections(socket: any): any {
    // console.log("co nguoi ket noi " + socket.id);

    new SocketService(io, socket);
  }
}

export default SocketSetup;
