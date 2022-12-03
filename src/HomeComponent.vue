
<template>
  <div>
    <h3 :style="{ backgroundColor: colors.blue }" @click="log()">home</h3>
  </div>
</template>
<script>
import colors from "@/components/library/colors";
export default {
  computed: {
    colors() {
      return colors;
    },
  },
  methods: {
    log() {
      console.log("colors", this.colors);
    },
  },
};
</script>