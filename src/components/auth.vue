<template>
  Email <input v-model="email" type="text" />
  <br />
  Password <input v-model="password" type="text" />
  <br />
  <button @click="signupUser">signup button</button>
  <button @click="loginUser">login button</button>
  <button @click="logoutUser">logout button</button>
</template>

<script>
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user is logged in");
    const uid = user.uid;
    // ...
  } else {
    console.log("not logged in");
  }
});

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    signupUser: function () {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user created:" + user);
          this.email = "";
          this.password = "";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ":" + errorMessage);
        });
    },
    loginUser: function () {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.email = "";
          this.password = "";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ":" + errorMessage);
        });
    },
    logoutUser: function () {
      const auth = getAuth();
      signOut(auth)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
