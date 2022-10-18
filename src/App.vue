<template>
  <div>
    <Navbar />
    <router-view />
    <button @click="test">test button</button>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
  methods: {
    test: function () {
      console.log("testing");
    },
  },
};
</script>
