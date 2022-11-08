import { createStore } from "vuex";

import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();
import { doc, setDoc } from "firebase/firestore";

import { db} from "./config";
auth.onAuthStateChanged(user => {
  console.log(user+'hdwhdwh')
  
})
const store = createStore({
  state: {
    //The user state will initially be null. After login, this state will be updated
    user: null,
  },
  mutations: {
    setLoading(state,loading){
      state.loading = loading;
    },
    //Mutation to update the user state
    //Takes in two arguments, the state and the payload. When we call this mutation, the payload will be user object from firebase auth
    //When the user logs out, we call the mutation and the payload will be null
    setUser(state, payload) {
      state.user = payload;
      //Log out the user state
      console.log(state.user.displayName)
      console.log(state.user.email);
      console.log("user state changeed");
    },
  },
  actions: {
    async signup(context, { email, password, fullname, username }) {
      
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response) {
        
        let user = auth.currentUser

        updateProfile(user, {
          displayName: fullname
        })

        context.commit("setUser", response.user);
        await setDoc(doc(db, "testdata", email), {
          fullname: fullname,
          username: username,
          password: password,
          major: "",
          bio: "",
          profilePicURL: ""
        })
      } else {
        throw new Error("signup failed");
      }
    },

    async login(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("setUser", response.user);
      } else {
        throw new Error("login failed");
      }
    },

    async logout(context) {
      await signOut(auth);
      context.commit("setUser", null);
    },
  },
});

// export the store
export default store;
