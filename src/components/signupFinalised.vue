<template>
  <div class="container w-100 m-auto">
    <div class="row">

      <div class="col-xs-3 col-lg-1"></div>

      <div class="col-xs-3 col-lg-4 justify-content-center">
        <lottie-player 
          autoplay 
          loop 
          src="https://assets1.lottiefiles.com/packages/lf20_yqyt4zdn.json"
          class="me-2 h-90">
        </lottie-player>
      </div>

      <div class="mt-5 col-xs-9 col-lg-6">
        <h1 class="display-2 text-center">Fling</h1>
        <div class="row px-5">
          <button class="rounded w-80 text-light p-2" style="background-color: #234db8">
            <i class="fab fa-google me-2"></i>Log In with Google
          </button>
        </div>
        <form @submit.prevent="handleSubmit()">
          <div class="row">
            <!--make the text lighter-->
            <span class="text-center my-2 text-secondary">OR</span>
          </div>

          <div class="px-5 mb-3">
            <!--email-->
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="email"
              required />
          </div>

          <div class="px-5 mb-3">
            <label for="fullname" class="form-label">Full name</label>
            <input type="text" class="form-control" id="fullname" placeholder="John Doe" v-model="fullname" required />
          </div>

          <div class="px-5 mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" placeholder="johndoe" v-model="username" required />
          </div>

          <div class="px-5 mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
          </div>
          <div v-if="error">{{ error }}</div>
          <div class="row px-5 mb-3">
            <button class="rounded btn btn-primary w-90">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import router from "../router/index"
import * as LottiePlayer from "@lottiefiles/lottie-player";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const fullname = ref("");
    const username = ref("");
    const error = ref(null);

    const store = useStore();
    console.log(store.state.user)
    const handleSubmit = async () => {
      try {
        await store.dispatch("signup", {
          email: email.value,
          password: password.value,
          fullname: fullname.value,
          username: username.value,
        });
        router.push("/setup");
      } catch (err) {
        error.value = err.message;
      }
    };
    return { handleSubmit, email, password, fullname, username, error };
  },
};
</script>
