<template>
    <div class="main">
      <div v-if="reg === false" class="registration">
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
            <p v-else class="bg2">
              {{ `${message.clientName}: ${message.clientMessage}` }}
            </p>
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
    this.connection = new WebSocket("ws://25.65.57.75:5000");
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
*{
  box-sizing: border-box;
}
html {
  width: 100%;
  height: 100%;
}
#app {
  flex: 1;
}
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  display: flex;
}
.main {
  height: 100%;
  width: 100%;
  background-color: rgb(204, 227, 227);
  display: flex;
  align-items: center;
}
.registration{
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  background-color: beige;
  
}
.bg {
  background-color: rgba(72, 255, 0, 0.471);
}
.bg2 {
  background-color: rgba(255, 0, 0, 0.341);
}
</style>
