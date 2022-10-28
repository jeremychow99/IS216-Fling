<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <Navbar v-if='this.$store.state.user' class='col-2'/>
      <router-view class='col'/>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  data() {
    return {
      
    }
  },
  components: { Navbar },
  methods: {
    
  },
};
</script>
