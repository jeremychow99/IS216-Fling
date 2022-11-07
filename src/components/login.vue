<template>
    <div class="container w-60 m-auto col-lg-6">
      <div class="container border border-dark mt-5">
        <div class="row">
          <h1 class="display-2 text-center">Fling</h1>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </div>
          <form @submit.prevent="handleSubmit" class="col-lg-6">
            <div class="px-5 mb-3">
              <label for="email" class="form-label">Email</label>
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
              <button class="rounded btn btn-primary">Log In</button>
            </div>
            <div v-if="error">{{ error }}</div>
            <div class="row">
              <!--make the text lighter-->
              <span class="text-center my-2">OR</span>
            </div>

            <div class="row px-5 mb-3">
              <button class="rounded btn btn-dark">Log In with Google</button>
            </div>
            <div class="row text-center">
              <span
                >Don't have an account?
                <router-link :to="{ name: 'signupFinalised' }"
                  >Sign Up</router-link
                >
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

export default {
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
        router.push("/");
      } catch (err) {
        error.value = err.message;
      }
    };
    return { handleSubmit, email, password, error };
  },
};
</script>
