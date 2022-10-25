<template>
  <div class="container w-60 m-auto col-lg-6">
    <div class="border border-dark mt-5">
      <div class="row">
        <h1 class="display-2 text-center">Fling</h1>
      </div>

      <div class="row px-5">
        <button class="rounded btn btn-dark w-90">Log In with Google</button>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <!--make the text lighter-->
          <span class="text-center my-2">OR</span>
        </div>

        <div class="px-5 mb-3">
          <!--email-->
          <label for="email" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
            v-model="email" required 
          />
        </div>

        <div class="px-5 mb-3">
          <label for="fullname" class="form-label">Full name</label>
          <input
            type="text"
            class="form-control"
            id="fullname"
            placeholder="John Doe"
            v-model="fullname" required 
          />
        </div>

        <div class="px-5 mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="johndoe"
            v-model="username" required 
          />
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
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const fullname = ref("");
    const username = ref("");
    const error = ref(null);

    const store = useStore();
    const router = useRouter();
    console.log(store.state.user)
    const handleSubmit = async () => {
      try {
        await store.dispatch("signup", {
          email: email.value,
          password: password.value,
          fullname: fullname.value,
          username: username.value,
        });
        router.push("/");
      } catch (err) {
        error.value = err.message;
      }
    };
    return { handleSubmit,email, password, fullname, username, error };
  },
};
</script>
