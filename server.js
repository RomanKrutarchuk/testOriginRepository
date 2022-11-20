import ws from "ws";
const { Server } = ws;
import { v4 as uuid } from "uuid";
import chalk from "chalk";

const clients = {};
// const messages = [];

const webSocketServer = new Server({ port: 5000 });
webSocketServer.on("connection", (Client) => {
  const id = uuid();
  clients[id] = Client;
  clients[id].send(JSON.stringify({ type: "client", thisClient: id }));
  console.log(chalk.bgGreen(`New client ${id}`));

  Client.on("close", () => {
    delete clients[id];
    console.log(chalk.bgRed(`Client is closed ${id}`));
  });

  Client.on("message", (JSONmessage) => {
    console.log("from client", JSONmessage);
    const { clientName, clientMessage, clientId } = JSON.parse(JSONmessage);

    for (const id in clients) {
      clients[id].send(
        JSON.stringify({ type: "message", clientName, clientMessage, clientId })
      );
    }
  });
});
