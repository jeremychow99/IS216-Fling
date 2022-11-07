<template>
  <div>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
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
          <li class="nav-item">
            <router-link class="btn btn-default" :to="{ name: 'Home' }">
              <i class="fa-solid fa-house-user fs-3"></i>
              <h6 class="nav-title">Home</h6>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-default" :to="{ name: 'Events' }">
              <i class="fa-solid fa-calendar-days fs-3"></i>
              <h6 class="nav-title">Events</h6>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-default" :to="{ name: 'Chats' }">
              <i class="fa-solid fa-message fs-3"></i>
              <h6 class="nav-title">Chats</h6>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-default" :to="{ name: 'signupFinalised' }">
          <h6 class="nav-title">Signup Page</h6>
        </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-default" :to="{ name: 'Login' }">
          <h6 class="nav-title">Login Page</h6>
        </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-default" :to="{ name: 'Setup' }">
          <h6 class="nav-title">Profile Setup</h6>
        </router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-default" :to="{ name: 'Login' }"><button @click="logoutFunc(); $emit('logout')">logout</button></router-link>
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

<style>
@media only screen and (max-width: 844px) {
  .nav-title {
    display: none;
  }
}
</style>
