import ws from "ws";
const { Server } = ws;
import { v4 as uuid } from "uuid";
import chalk from 'chalk'

const client = {};
const clients = [];

const webSocketServer = new Server({ port: 8081 });
webSocketServer.on("connection", (wsClient) => {
  const id = uuid();
  client[id] = wsClient;
  console.log(chalk.bgGreen(`New client ${id}`));
  

  wsClient.on("close", () => {
    delete client[id];
    console.log(chalk.bgRed(`Client is closed ${id}`));
    
  });
  wsClient.on('message',(message)=>{
    console.log('clientMessage',message);
  })
});





function log() {
  console.log("clients :", clients);
}
