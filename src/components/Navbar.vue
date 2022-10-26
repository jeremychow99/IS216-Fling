<template>
  <div class="col-2 col-sm-2 col-lg-2 text-center">
    <div
      class="d-flex flex-column border-end position-fixed"
      style="height: 100%; width: 16%; align-items: center"
      id="left-navbar"
    >
      <div>
        <img src="public/favicon.ico" class="fs-3 mt-3" />
      </div>
      <div class="my-3">
        <router-link class="btn btn-default" :to="{ name: 'Home' }">
          <i class="fa-solid fa-house-user fs-3"></i>
          <h6 class="nav-title">Home</h6>
        </router-link>
      </div>

      <div class="my-3">
        <router-link class="btn btn-default" :to="{ name: 'Events' }">
          <i class="fa-solid fa-calendar-days fs-3"></i>
          <h6 class="nav-title">Events</h6>
        </router-link>
      </div>

      <div class="my-3">
        <router-link class="btn btn-default" :to="{ name: 'Chats' }">
          <i class="fa-solid fa-message fs-3"></i>
          <h6 class="nav-title">Chats</h6>
        </router-link>
      </div>

      <div class="my-3">
        <router-link class="btn btn-default" :to="{ name: 'Profile' }">
          <i class="fa-solid fa-user fs-3"></i>
          <h6 class="nav-title">Profile</h6>
        </router-link>
      </div>
      <div class="my-3">
        <router-link class="btn btn-default" :to="{ name: 'signupFinalised' }">
          <h6 class="nav-title">Signup Page</h6>
        </router-link>
      </div>

      <div class="my-3">
        <button @click="logoutFunc">logout</button>
      </div>

      <div class="profile_icon position-absolute fs-3" style="bottom: 60px">
        <!-- PROFILE_PIC <font-awesome-icon icon="fa-solid fa-user" /> for Vue -->
        <!-- REPLACE WITH PROFILE PICTURE -->
        <button class="btn btn-default">
          <!-- !TODO link change to profile -->
          <a href="events.html">
            <img
              src="https://placekitten.com/30/30"
              class="img-fluid"
              style="border-radius: 60%"
            />
          </a>
        </button>
      </div>
      <!-- Replace with username -->
      <p class="fs-6 fw-light position-absolute" style="bottom: 16px">@tanxx</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const error = ref(null);
    const store = useStore();

    const logoutFunc = async () => {
      try {
        await store.dispatch("logout");
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
