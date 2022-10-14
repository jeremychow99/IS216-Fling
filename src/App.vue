<template>
  <div class="w-4/5 mx-auto mt-4">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: {Navbar}
}
</script>