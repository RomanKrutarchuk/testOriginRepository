<template>
<div>
  <form id="messageForm">
        <input type="text" name="name" id="name" />
        <input type="text" name="message" id="message" />
        <input type="submit" value="send" />
    </form>
</div>
</template>

<script>
export default {
  
}
const ws = new WebSocket("ws://127.0.0.1:8081")
</script>
