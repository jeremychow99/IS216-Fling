<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>
<script>
import { db } from "@/config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Signup from './components/auth.vue';

const colRef = collection(db, "testdata");
export default {
  name: "App",
  components: {
    HelloWorld,
    Signup,
  },

  data() {
    return {
      inputData: "",
      deleteInput: "",
    };
  },

  methods: {
    getData: async function () {
      getDocs(colRef);
      const querySnapshot = await getDocs(colRef);
      querySnapshot.forEach((doc) => {
        console.log("id:", doc.id, "data:", doc.data());
      });
    },
    addData: async function () {
      //TODO: make element id be the name or username, instead of being randomly generated
      const docRef = await addDoc(colRef, {
        name: this.inputData,
      });
      console.log("document added with id: ", docRef.id);
    },
    deleteData: async function () {
      //TODO: need to check verify entry exists in firebase db before deleting, if not then throw ERROR
      try {
        deleteDoc(doc(db, "testdata", this.deleteInput));
        console.log("document deleted succesfully!");
      } catch (error) {
        console.log(error)
      } finally {
        this.deleteInput = ""
      }
    },
  },
};
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />


  </header>

  <main>
    <div>
      <Signup />
      </div>
  </main>
  <button @click="getData">Retrieve data</button>
  <br>
  <button @click="addData">Add data</button>
  <input v-model="inputData" type="text" />
  <button @click="deleteData">Delete data</button>
  <input v-model="deleteInput" type="text" />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
