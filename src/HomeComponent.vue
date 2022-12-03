<template>
  <div>
    <h3>home</h3>
    <button @click="view = true">button</button>
    <div v-if="view === true">
      <component :is="LayotComponent"></component>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      view: false,
      LayotComponent: null,
    };
  },
  mounted() {
    this.LayotComponent = () => import("@/components/components/Layout");
  },
};
</script>