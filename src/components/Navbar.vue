<template>
  <div>
  <nav class="navbar navbar-expand-lg navbar-dark gradient-custom">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo-no-background.png" class="d-inline-block align-top mx-3" alt="Kitten" style="height:100px">
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto mt-2">
          <li class="nav-item me-3">
            <router-link class="btn btn-default" :to="{ name: 'Home' }">
              <h4 class="nav-title">Home</h4>
            </router-link>
          </li>
          <li class="nav-item me-3">
            <router-link class="btn btn-default" :to="{ name: 'Events' }">

              <h4 class="nav-title">Events</h4>
            </router-link>
          </li>
          <li class="nav-item me-3">
            <router-link class="btn btn-default" :to="{ name: 'Chats' }">

              <h4 class="nav-title ">Chats</h4>
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-3 mb-3">
          <li class="nav-item">
            <div class="dropdown d-flex">
              <button class="btn btn-secondary dropdown-toggle mt-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Picture UserName
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><router-link class="dropdown-item" :to="{ name: 'Profile', params: {id: this.$store.state.user.email} }">Profile</router-link></li>
                <li><router-link class="dropdown-item" @click="logoutFunc(); $emit('logout')" :to="{ name: 'Login' }">Logout</router-link></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const error = ref(null);
    const store = useStore();
    const router = useRouter();
    const logoutFunc = async () => {
      localStorage.clear();
      try {
        await store.dispatch("logout");
        // router.push('login')
      } catch (err) {
        error.value = err.message;
      }
    };
    return { logoutFunc, error };
  },
};
</script>

<style scoped>
.nav-item:hover{
  color:white;

}
.router-link-active{
  text-decoration:underline;
  color:white;
  
}
.navbar{
  font-family: Futura, Trebuchet MS, Arial, sans-serif;
}
.gradient-custom{
  background: #c471f5;
  background: linear-gradient(to right, #17ACEB, #5E8BF5)
}
</style>