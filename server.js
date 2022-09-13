import ws from "ws";
const { Server } = ws;
import { v4 as uuid } from "uuid";

const client = {};
const clients = [];

const wss = new Server({ port: 8081 });
wss.on("connection", (ws) => {
  const id = uuid();
  client[id] = ws;
  console.log(`New client ${id}`);
  ws.on("close", () => {
    delete client[id];
    console.log(`Client is closed ${id}`);
    
  });
});
function log() {
  console.log("clients :", clients);
}
