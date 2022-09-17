<template>
  <div>
    <div id="form">
      <input v-model="name" type="text" name="name" id="name" />
      <input v-model="message" type="text" name="message" id="message" />
      <button @click="send()">submit</button>
      <button @click="log()">log</button>
    </div>

    <!-- <div id="chat" v-for="(messages,i) in clientsMessages" :key="i"><p>{{messages}}</p></div> -->
  </div>
</template>

<script>
export default {
  name: "",
  message: "",
  messages: [],
  computed: {
    wsMessages: {
      get() {
        ws.onmessage = (message) => {
          console.log(JSON.parse(message.data));
        };
      },
    },
    num: {
      get() {
        return 1 + 1;
      },
    },
  },
  methods: {
    log() {
      console.log(this.wsMessages, "wsMessages");
    },
    send: function () {
      const clientName = this.name;
      const clientMessage = this.message;
      ws.send(
        JSON.stringify({
          clientName,
          clientMessage,
        })
      );
      this.name = "";
      this.message = "";
    },
    messages() {
      console.log(ClientsMessages, "ClientsMessages");
    },
  },
};
const ws = new WebSocket("ws://127.0.0.1:8081");

// function log(){
//   console.log(this.clientsMessages,'clientsMessages');
// }
// log()
</script>
