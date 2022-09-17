import ws from "ws";
const { Server } = ws;
import { v4 as uuid } from "uuid";
import chalk from 'chalk'

const clients ={};
const messages = [];

const webSocketServer = new Server({ port: 8081 });
webSocketServer.on("connection", (wsClient) => {
  const id = uuid();
  clients[id] = wsClient;
  console.log(chalk.bgGreen(`New client ${id}`));
  

  wsClient.on("close", () => {
    delete clients[id];
    console.log(chalk.bgRed(`Client is closed ${id}`));
    
  });
  wsClient.on('message',(JSONmessage)=>{
    console.log('clientMessage',JSONmessage);
    const {clientName, clientMessage} = JSON.parse(JSONmessage)
    messages.push({clientName, clientMessage})
  for(const id in clients){
    clients[id].send(JSON.stringify([{clientName, clientMessage}]))
  }
  })
});





function log() {
  console.log("clients :", clients);
}
