<template>
  <div><LoadingScreen v-if="isLoading"></LoadingScreen></div>
  <Navbar @logout="logoutUser" v-if="!isLoading" />
  <div v-if="!isLoading" class="container" id="main-content">
    <div class="row align-items-center my-2">
      <div id="title" class="col-2 text-center">
        <strong class="fs-3">Home</strong>
      </div>

      <div class="col-10">
        <div class="text-center">
          <input
          type="text"
          class="form-control w-75 mx-auto rounded-pill my-4 fontAwesome d-inline-block me-2"
          placeholder="&#xf002; Search for People..."
          aria-label="search"
          aria-describedby="button-search"
          v-model="name_filter"
          />

          <button type="button" class="btn btn-white d-inline-block" data-bs-toggle="collapse" data-bs-target="#collapseFilter" aria-expanded="false" aria-controls="collapseFilter"><i class="fa-solid fa-filter"></i></button>
        </div>
      </div>
    </div>

    <div class="collapse" id="collapseFilter">
      <!-- Filter by interest, First Major, Second Major, Year of Study -->
      <div class="container">
        
        <div class="row">
          <div class="col-6 col-xl-3 mb-3">
            <label class="form-label">Year of Study</label>
            <select class="form-select" aria-label="year">
              <option v-for="year of years" :value="year" :key="year">{{ year }}</option>
            </select>
          </div>
          <div class="col-12 col-xl-9">
              <!-- Interest -->
          </div>
        </div> 

        <div class="row">
          <div class="col-12 col-xl-6 mb-3">
            <label for="major1DataList" class="form-label">First Major</label>
            <input class="form-control" list="major1Options" id="major1DataList" placeholder="Type to search...">
            <datalist id="major1Options">
              <option v-for="(major, index) of major1" :key="index" :value="major"></option>
            </datalist>
          </div>
          <div class="col-12 col-xl-6 mb-3">
            <label for="major2DataList" class="form-label">Second Major</label>
            <input class="form-control" list="major2Options" id="major2DataList" placeholder="Type to search...">
            <datalist id="major2Options">
              <option v-for="(major, index) of major2" :key="index" :value="major"></option>
            </datalist>
          </div>
        </div>

        <button class="btn btn-primary">Apply</button>
      </div>
    </div>

    <hr />

    <div class="row mt-3">
      <profilecard
        v-for="user in displayUsers"
        :key="user.id"
        :name="user.fullname"
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
import LoadingScreen from "../components/loading.vue";

export default {
  components: {
    profilecard,
    Navbar,
    LoadingScreen,
  },
  methods: {
    logoutUser: function () {
      setTimeout(() => {
        this.isLoading = true;
      }, 1000);
    },
  },
  data() {
    return {
      // Array to store all users in database
      // To Include img src as well
      users: [
        // {
        //   id: "sclim.2021@smu.edu.sg",
        //   fullname: "Lim Seow Chong",
        //   major: "Information Systems",
        //   year: "2",
        //   interests: [
        //     "Data Science",
        //     "Artificial Intelligence",
        //     "Mathematics",
        //     "Software Engineering",
        //   ],
        // },
        // {
        //   id: "sktam.2020@smu.edu.sg",
        //   fullname: "Tam Siao Kia",
        //   major: "Computer Science",
        //   year: "3",
        //   interests: [
        //     "Cyber Security",
        //     "Software Engineering",
        //     "Cloud Computing",
        //     "Blockchain",
        //     "Web 3.0",
        //   ],
        // },
        // {
        //   id: "ctee.2022@smu.edu.sg",
        //   fullname: "Clement Tee",
        //   major: "Economics",
        //   year: "1",
        //   interests: [
        //     "Econometrics",
        //     "Business Intelligence",
        //     "FinTech",
        //     "Investment Banking",
        //   ],
        // },
        // {
        //   id: "mteo.2019@smu.edu.sg",
        //   fullname: "Michelle Teo",
        //   major: "Business Management",
        //   year: "4",
        //   interests: ["Entrepreneurship", "Management", "Marketing"],
        // },
      ],
      years: [1, 2, 3, 4, 5],
      major1: [
        "Accounting",
        "Communication Management",
        "Communication Management (Data, Design and Communication)",
        "Entrepreneurship",
        "Finance",
        "Finance (Real Estate)",
        "Finance (Wealth Management)",
        "Finance (International Trading)",
        "Finance (Banking)",
        "Marketing",
        "Marketing (Marketing Analytics)",
        "Marketing (Retail and Services Management)",
        "Operations Management",
        "Operations Management (Operation Analytics)",
        "Operations Mangement (Maritime Business and Operations)",
        "Organisational Behaviour & Human Resources",
        "Quantitative Finance",
        "Strategic Management",
        "Economics",
        "Economics (Quantitative Economics)",
        "Economics (Real Estate)",
        "Law",
        "Information Systems (Business Analytics)",
        "Information Systems (Digitalisation & Cloud Solutions)",
        "Information System (Financial Technology)",
        "Information Systems (Business Analytics & Digitalisation & Cloud Solutions)",
        "Information Systems (Digitalisation & Cloud Solutions & Financial Technology)",
        "Information System (Business Analytics & Financial Technology)",
        "Smart City Management & Technology",
        "Computer Science (Artificial Intelligence)",
        "Computer Science (Cybersecurity)",
        "Computer Science (Cyber-Physical Systems)",
        "Computer Science (Artificial Intelligence & Cybersecurity)",
        "Computer Science (Artificial Intelligence & Cyber-Physical Systems)",
        "Computer Science (Cybersecurity & Cyber-Physical Systems)",
        "Computing & Law",
        "Software Engineering",
        "Politics, Law and Economics",
        "Political Science",
        "Psychology",
        "Sociology",
      ],

      major2: [
        "Accounting",
        "Accounting Data and Analytics",
        "Financial Forensics",
        "Communication Management",
        "Communication Management (Data, Design and Communication)",
        "Entrepreneurship",
        "Finance",
        "Finance (Real Estate)",
        "Finance (Wealth Management)",
        "Finance (International Trading)",
        "Finance (Banking)",
        "Marketing",
        "Marketing (Marketing Analytics)",
        "Marketing (Retail and Services Management)",
        "Operations Management",
        "Operations Management (Operation Analytics)",
        "Operations Mangement (Maritime Business and Operations)",
        "Organisational Behaviour & Human Resources",
        "Quantitative Finance",
        "Strategic Management",
        "Digital Business",
        "Sustainability",
        "Economics",
        "Economics (Quantitative Economics)",
        "Economics (Real Estate)",
        "Actuarial Science",
        "Health Economics & Management",
        "Data Science and Analytics",
        "Legal Studies",
        "Computing Studies (Artificial Intelligence)",
        "Computing Studies (Cybersecurity)",
        "Computing Studies (Cyber-Physical Systems)",
        "Technology for Business Solutions (Business Analytics)",
        "Technology for Business Solutions (Digitalisation & Cloud Solutions)",
        "Technology for Business Solutions (Financial Technology)",
        "IT Solution Mangement",
        "Technology for Business",
        "Political Science",
        "Psychology",
        "Sociology",
        "Arts and Culture Management",
        "Global Asia",
        "Public Policy and Public Management",
      ],

      name_filter: "",
      year_filter: "",
      major1_filter: "",
      major2_filter: "",
      interest_filter: [],

      isLoading: true,
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
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    const querySnapshot = await getDocs(collection(db, "profileDetails"));
    querySnapshot.forEach((user) => {
      // console.log(user.id, " => ", user.data());

      if (user.id != this.$store.state.user.email) {
        const userData = user.data();

        // console.log("Interests: ", user.data().interests)
        const userObj = {
          id: user.id,
          fullname: userData.fullname,
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

html {
    overflow-y: overlay;
}
</style>
