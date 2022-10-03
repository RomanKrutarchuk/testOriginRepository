<template>
  <div class="main">
    <div v-if="reg === false">
      <input v-model="value" type="text" />
      <button @click="registration">register</button>
    </div>
    <div v-if="reg === true" id="form">
      <h3>{{ user.name }}</h3>
      <input v-model="message" type="text" name="message" id="message" />
      <button @click="send()">submit</button>
      <button @click="log()">log</button>
      <div v-for="(message, i) in temp" :key="i">
        <div v-if="message.type === 'message'">
          <p v-if="message.clientId === user.id" class="bg">
            {{ `${message.clientName}: ${message.clientMessage}` }}
          </p>
          <p v-else class="bg2">{{ `${message.clientName}: ${message.clientMessage}` }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reg: false,
      value: "",
      message: "",
      connection: null,
      temp: [],
      user: {
        name: null,
        id: null,
      },
    };
  },
  computed: {},
  methods: {
    log: function () {
      console.log(this, "this");
    },
    registration() {
      this.user.name = this.value;
      this.value = "";
      this.reg = true;
      console.log("this.user.name", this.user.name);
      console.log("this.user", this.user);
    },
    send: function () {
      const clientName = this.user.name;
      const clientMessage = this.message;
      const clientId = this.user.id;
      this.connection.send(
        JSON.stringify({
          clientId,
          clientName,
          clientMessage,
        })
      );
      this.message = "";
    },
  },
  created() {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://127.0.0.1:8081");
    this.connection.onopen = function (event) {
      console.log("Successfully connected to websocket server...");
    };
    let thisComponentExample = this;
    this.connection.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.type === "client") {
        const clientId = data.thisClient;
        thisComponentExample.user.id = clientId;
      }
      thisComponentExample.temp.push(data);
    };
  },
};
</script> 
<style>

.bg {
  background-color: rgba(72, 255, 0, 0.471);
}
.bg2 {
  background-color: rgba(255, 0, 0, 0.341);
}
</style>
