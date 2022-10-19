<template>
  <div class="row">
    <Navbar v-if='loginStatus' class='col-2'/>
    <router-view class='col-10'/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  data() {
    return {
      loginStatus: true
    }
  },
  components: { Navbar },
  methods: {
    test: function () {
      console.log("testing");
    },
  },
};
</script>
