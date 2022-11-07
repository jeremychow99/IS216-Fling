import { createRouter, createWebHistory } from "vue-router";

import Main from "../views/Main.vue";
import Signup from "../views/Signup.vue";
import Login from "../components/login.vue";
import Events from "../views/Events.vue";
import Chats from "../views/Chats.vue";
import ChatRoom from "../views/ChatRoom.vue";
import Profile from "../views/Profile.vue"
import signupFinalised from "../components/signupFinalised.vue"
import profilepic from "../components/profilepic.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Main,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/events",
    name: "Events",
    component: Events,
  },
  {
    path: "/chats",
    name: "Chats",
    component: Chats,
    props: true
  },
  {
    path: "/chats/:id",
    name: "Chatroom",
    component: ChatRoom,
    props: true
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signupFinalised",
    name: "signupFinalised",
    component: signupFinalised,
  },
  {
    path: "/setup",
    name: "Setup",
    component: profilepic
  }
];


import store from "../store"
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if (store.state.user == null && to.name !== 'Login' && to.name !== 'signupFinalised') {
    console.log('not logged in')
    return { name: 'Login' }
  }
})

import { db } from "@/config";
import { doc, getDoc } from "firebase/firestore";
router.beforeEach(async (to, from) => {
  if (store.state.user != null) {
    const docRef = doc(db, "testdata", store.state.user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {

      let userData = docSnap.data()
      if (to.name !== 'Setup' && (userData.profilePicURL == "" || userData.bio == "" || userData.major =="")){

        return { name: 'Setup' }
      }

    } else {
      console.log("No such document!");
    }
  }
})

export default router;
