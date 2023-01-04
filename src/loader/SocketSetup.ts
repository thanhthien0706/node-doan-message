import socketio from "socket.io";
import SocketService from "../service/ipml/Socket.service";
import UserService from "../service/ipml/User.service";

let io: any = null;
let listUserSocket: any = [];

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
    socket.on("disconnect", async () => {
      const userDisconnect = listUserSocket.filter(
        (user: any) => user.idSocket == socket.id
      );

      if (userDisconnect.length > 0) {
        await UserService.updateStatusUser(userDisconnect[0].idUser, false);
        io.emit("server:changeState");
      }
    });

    socket.on("client:updateStateUser", async ({ id, status }: any) => {
      await UserService.updateStatusUser(id, status);

      const checkExist = listUserSocket.filter(
        (user: any) => user.idUser == id
      );

      if (checkExist.length > 0) {
        checkExist[0].idSocket = socket.id;
      } else {
        listUserSocket.push({
          idUser: id,
          idSocket: socket.id,
        });
      }

      io.emit("server:changeState");
    });

    new SocketService(io, socket);
  }
}

export default SocketSetup;
