import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class DocumentGateway {
    @WebSocketServer()
    server: Server;

    emitDocumentUpdated(data: unknown) {
        this.server.emit("document.updated", data);
    }
}
