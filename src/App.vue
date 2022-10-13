<script setup>
// nothing here yet
</script>

<script>
import { db } from "@/config"; // why does removing this line break the app?

//import components 
import Signup from './components/auth.vue';
import DataFunc from './components/dataTest.vue'


export default {
  name: "App",
  components: {
  },
};
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>
  
  <main>
    <div>
      <Signup/>
      <DataFunc/>
      </div>
  </main>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
