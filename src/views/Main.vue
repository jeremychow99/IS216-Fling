<template>
  <div class="container">
    <div class="row align-items-center my-2">
      <div id="title" class="col-2 text-center">
        <strong class="fs-3">Home</strong>
      </div>

      <div class="col-10">
        <input
          type="text"
          class="form-control w-75 mx-auto rounded-pill my-4 fontAwesome"
          placeholder="&#xf002; Search for People..."
          aria-label="search"
          aria-describedby="button-search"
          v-model="name_filter"
        />
      </div>
    </div>

    <hr />

    <div class="row mt-3">
      <profilecard
        v-for="user in displayUsers"
        :key="user.id"
        :name="user.name"
        :major="user.major"
        :year="user.year"
        :interests="user.interests"
      />
    </div>
  </div>
</template>

<script>
import profilecard from "../components/profilecard.vue";
import { db } from "../config";
import { getDocs, collection } from "firebase/firestore";
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    profilecard,
    Navbar,
  },

  data() {
    return {
      // Array to store all users in database
      // To Include img src as well
      users: [
        {
          id: "sclim.2021@smu.edu.sg",
          name: "Lim Seow Chong",
          major: "Information Systems",
          year: "2",
          interests: [
            "Data Science",
            "Artificial Intelligence",
            "Mathematics",
            "Software Engineering",
          ],
        },
        {
          id: "sktam.2020@smu.edu.sg",
          name: "Tam Siao Kia",
          major: "Computer Science",
          year: "3",
          interests: [
            "Cyber Security",
            "Software Engineering",
            "Cloud Computing",
            "Blockchain",
            "Web 3.0",
          ],
        },
        {
          id: "ctee.2022@smu.edu.sg",
          name: "Clement Tee",
          major: "Economics",
          year: "1",
          interests: [
            "Econometrics",
            "Business Intelligence",
            "FinTech",
            "Investment Banking",
          ],
        },
        {
          id: "mteo.2019@smu.edu.sg",
          name: "Michelle Teo",
          major: "Business Management",
          year: "4",
          interests: ["Entrepreneurship", "Management", "Marketing"],
        },
      ],
      name_filter: "",
    };
  },

  computed: {
    displayUsers() {
      // Filtering
      if (this.name_filter.length) {
        let user_arr = [];
        this.users.forEach((user) => {
          if (user.name.includes(this.name_filter)) {
            user_arr.push(user);
          }
        });

        return user_arr;
      } else {
        return this.users;
      }
    },
  },
  // Onmounted
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "profileDetails"));
    querySnapshot.forEach((user) => {
      // console.log(user.id, " => ", user.data());

      if (user.id != this.$store.state.user.email) {
        const userData = user.data();

        // console.log("Interests: ", user.data().interests)
        const userObj = {
          id: user.id,
          name: userData.name,
          major: userData.major,
          year: userData.year,
          interests: userData.interests,
          // img: IMAGEURL
        };

        this.users.push(userObj);
      }
    });
  },
};
</script>

<style>
.fontAwesome {
  font-family: "Helvetica", FontAwesome, sans-serif;
}
</style>
