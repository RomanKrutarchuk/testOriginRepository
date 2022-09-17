<template>
  <div>
    <div id="form">
      <input v-model="name" type="text" name="name" id="name" />
      <input v-model="message" type="text" name="message" id="message" />
      <button @click="send()">submit</button>
    </div>

    <div id="chat"></div>
  </div>
</template>

<script>
export default {
  name: "",
  message: "",

  methods: {
    send: function () {
      const name = this.name
      const message = this.message
      wsClient.send(JSON.stringify({
        name , message
      }))
      this.name = ''
      this.message = ''
    },
  },
};
const wsClient = new WebSocket("ws://127.0.0.1:8081");

log();
function log() {
  console.log(wsClient);
}
</script>
