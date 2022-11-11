<template>
  <div>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top mx-3" alt="Kitten">
        Fling
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
        <ul class="navbar-nav">
          <li class="nav-item me-3">
            <router-link class="btn btn-default" :to="{ name: 'Home' }">
              <i class="fa-solid fa-house-user fs-3"></i>
              <h6 class="nav-title">Home</h6>
            </router-link>
          </li>
          <li class="nav-item me-3">
            <router-link class="btn btn-default" :to="{ name: 'Events' }">
              <i class="fa-solid fa-calendar-days fs-3"></i>
              <h6 class="nav-title">Events</h6>
            </router-link>
          </li>
          <li class="nav-item me-3">
            <router-link class="btn btn-default" :to="{ name: 'Chats' }">
              <i class="fa-solid fa-message fs-3"></i>
              <h6 class="nav-title ">Chats</h6>
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto me-3 mb-3">
          <li class="nav-item">
            <div class="dropdown d-flex">
              <button class="btn btn-secondary dropdown-toggle mt-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Picture UserName 
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#">Route to Profile</a></li>
                <li><a class="dropdown-item" href="#">Route to edit bio etc</a></li>
                <li><a class="dropdown-item" @click="logoutFunc(); $emit('logout')"><router-link :to="{ name: 'Login' }">Logout</router-link></a></li>
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
  color:blue;
}
.router-link-active{
  text-decoration:underline;
}
</style>