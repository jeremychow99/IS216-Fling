<template>
  <div class="container w-60 m-auto col-lg-6">
    <div class="border border-dark mt-5">
      <div class="row">
        <h1 class="display-2 text-center">Fling</h1>
      </div>

      <div class="row px-5">
        <button class="rounded btn btn-dark w-90">Log In with Google</button>
      </div>

      <div class="row">
        <!--make the text lighter-->
        <span class="text-center my-2">OR</span>
      </div>

      <div class="px-5 mb-3">
        <!--email-->
        <label for="exampleFormControlInput1" class="form-label"
          >Email address</label
        >
        <input
          v-model="inputEmail"
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>

      <div class="px-5 mb-3">
        <label for="fullname" class="form-label">Full name</label>
        <input
          v-model="inputFullname"
          type="text"
          class="form-control"
          id="fullname"
          placeholder="John Doe"
        />
      </div>

      <div class="px-5 mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          v-model="inputUsername"
          type="text"
          class="form-control"
          id="username"
          placeholder="johndoe"
        />
      </div>

      <div class="px-5 mb-3">
        <label for="inputPassword" class="form-label">Password</label>
        <input
          v-model="inputPassword"
          type="password"
          class="form-control"
          id="inputPassword"
        />
      </div>

      <div class="row px-5 mb-3">
        <button @click="addDataToDB" class="rounded btn btn-primary w-90">
          Sign Up
        </button>
        <button @click="handleSubmit">SINGUP FIREBASE</button>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";

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
        await store.dispatch("signup", {
          email: inputEmail,
          password: inputPassword,
        });
        router.push("/");
      } catch (err) {
        error.value = err.message;
      }
    };

    return { handleSubmit, email, password, error };
  },
  data() {
    return {
      inputEmail: "",
      inputFullname: "",
      inputUsername: "",
      inputPassword: "",
    };
  },
  methods: {
    addDataToDB: async function () {
      handleSubmit();
      console.log(this.inputUsername);
      console.log(this.inputPassword);
      await setDoc(doc(db, "testdata", this.inputEmail), {
        fullname: this.inputFullname,
        username: this.inputUsername,
        password: this.inputPassword,
      });
    },
  },
};
</script>
