import socketio from "socket.io";

class SocketSetup {
  private readonly io: any;
  constructor(server: any) {
    this.io = require("socket.io")(server, {
      cors: {
        origin: "*",
      },
    });

    this.initMain();
  }
  initMain() {
    this.io.on("connection", this.handleConnections);
  }
  handleConnections(socket: any): any {
    console.log("co nguoi ket noi " + socket.id);

    socket.on("disconnect", () => {
      console.log("co nguoi nguoi ngat ket noi " + socket.id);
    });
  }
}

export default SocketSetup;
