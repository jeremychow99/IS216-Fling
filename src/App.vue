<template>
  <div class="row">
    <Navbar v-if='this.$store.state.user' class='col-2'/>
    <router-view class='col-10'/>
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
