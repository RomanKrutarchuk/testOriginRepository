<template>
  <div>
    <div id="form">
      <input v-model="name" type="text" name="name" id="name" />
      <input v-model="message" type="text" name="message" id="message" />
      <button @click="send()">submit</button>
      <button @click="log()">log</button>
      <div v-for="(message, i) in temp" :key="i">
        {{ `${message.clientName}: ${message.clientMessage}` }}
      </div>
    </div>

    <!-- <div id="chat" v-for="(messages,i) in clientsMessages" :key="i"><p>{{messages}}</p></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      connection: null,
      temp: [],
    };
  },
  computed: {
    // onMessage: {
    //   get() {
    //     this.connection.onMessage = function (event) {
    //       return event.data
    //     };
    //   },
    // },
  },
  methods: {
    log: function () {
      console.log(this, "this");
    },
    send: function () {
      // console.log("connection", this.connection);
      const clientName = this.name;
      const clientMessage = this.message;
      this.connection.send(
        JSON.stringify({
          clientName,
          clientMessage,
        })
      );
      this.name = "";
      this.message = "";
    },
  },
  created() {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://127.0.0.1:8081");
    this.connection.onopen = function (event) {
      console.log("Successfully connected to websocket server...");
    };
    let thisApp = this;
    this.connection.onmessage = function (event) {
      thisApp.temp.push(JSON.parse(event.data));
    };
  },
};
</script> 
