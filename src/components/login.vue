<template>
  <div><LoadingScreen v-if="$store.state.loading"></LoadingScreen></div>
  <div v-if="!$store.state.loading" class="container w-100 m-auto">
      <div class="row">
        <div class="col-xs-3 col-lg-1"></div>
        <div class="col-xs-3 col-lg-4 justify-content-center">
          <lottie-player
            autoplay
            loop
            src="https://assets7.lottiefiles.com/packages/lf20_and4mptz.json"
            class="me-2 h-90"
          >
          </lottie-player>
        </div>
        <div class="mt-5 col-xs-9 col-lg-6">
          <h1 class="display-2 text-center">Fling</h1>
      <form @submit.prevent="handleSubmit">
        <div class="px-5 mb-3">
          <label for="email" class="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            v-model="email"
            required
            class="form-control"
          />
        </div>

        <div class="px-5 mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            name="password"
            v-model="password"
            required
            class="form-control"
          />
        </div>

        <div class="row px-5">
          <button class="rounded btn btn-primary text-light"><i class="fa-solid fa-right-to-bracket"></i> Log In</button>
        </div>
        <div v-if="error">{{ error }}</div>
        <div class="row">
          <!--make the text lighter-->
          <span class="text-center my-2">OR</span>
        </div>

        <div class="row px-5 mb-3">
          <button
            class="rounded btn text-light"
            style="background-color: #55acee"
          >
            <i class="fab fa-google me-2"></i>Log In with Google
          </button>
        </div>
        <div class="row text-center">
          <span
            >Don't have an account?
            <router-link :to="{ name: 'signupFinalised' }">Sign Up</router-link>
          </span>
        </div>
      </form>
      </div>
      </div>
    </div>

  <!--end of container containing user login-->
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import LoadingScreen from "./loading.vue";
import myStore from "../store";
export default {
  methods: {
    // setLoad: function(){
    //   this.isLoading=true
    // }
  },
  mounted() {
    setTimeout(() => {
      myStore.state.loading = false;
    }, 1500);
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref(null);

    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        store.state.loading = true;
        router.push("/");
      } catch (err) {
        error.value = err.message;
      }
    };
    return { handleSubmit, email, password, error };
  },
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    LoadingScreen,
  },
};
</script>
