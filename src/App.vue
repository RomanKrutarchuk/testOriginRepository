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
  connection: null,
  name: "",
  message: "",
  messages: [],
  computed: {},
  methods: {
    log() {
      console.log(this.wsMessages, "wsMessages");
    },
    send: function () {
      const clientName = this.name;
      const clientMessage = this.message;
      this.name = "";
      this.message = "";
      this.connection.send(
        JSON.stringify({
          clientName,
          clientMessage,
        })
      );
    },
  },
  created: function () {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://127.0.0.1:8081");
  },
};

// const ws = new WebSocket("ws://127.0.0.1:8081");
// ws.onmessage((message) => {
//   console.log(message);
// });

// function log(){
//   console.log(this.clientsMessages,'clientsMessages');
// }
// log()
</script>
