<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <Navbar v-if="this.$store.state.user" class="col-2" />
      <router-view v-slot="{ Component }" class="col">
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
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
