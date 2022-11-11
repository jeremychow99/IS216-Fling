<template>
  <div class="container-fluid" style="padding: 0px">
    <!-- <Navbar v-if="this.$store.state.user" class="row" /> -->

      <router-view v-slot="{ Component }">
        <!-- <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        > -->
          <div><component :is="Component"/></div> 
<!-- TRANSITIONS DONT WORK WHEN I PUT THE DIV TAG ABOVE, but if i dont the component doesnt appear -->
        <!-- </transition> -->
      </router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  data() {
    return {};
  },
  components: { Navbar },
  methods: {},
};
</script>

