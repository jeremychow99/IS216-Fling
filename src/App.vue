<template>
  <div style="padding: 0px">
    <!-- <Navbar v-if="this.$store.state.user" class="row" /> -->

      <router-view v-slot="{ Component }">
          <div><component :is="Component"/></div> 
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

