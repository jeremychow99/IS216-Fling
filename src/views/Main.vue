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
          <div class="col-12 col-xl-6 mb-3">
            <label for="major1DataList" class="form-label">First Major</label>
            <Multiselect
            v-model="major1_filter"
            placeholder="Type to search..."
            :searchable=true
            :options="major1"
            />
          </div>
          <div class="col-12 col-xl-6 mb-3">
            <label for="major2DataList" class="form-label">Second Major</label>
            <Multiselect
            v-model="major2_filter"
            placeholder="Type to search..."
            :searchable=true
            :options="major2"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-xl-3 mb-3">
            <label class="form-label">Year of Study</label>
            <select class="form-select" aria-label="year" v-model="year_filter">
              <option v-for="year of years" :value="year" :key="year">{{ year }}</option>
            </select>
          </div>
          <div class="col-12 col-xl-9">
              <!-- Interest -->
              <label class="form-label">Interests</label>
              <Multiselect 
              v-model="interest_filter" 
              mode="tags" 
              placeholder="Select interests filter (Up to 5)" :close-on-select="false"
              :searchable="true"
              :max="5" :options="interests" />
          </div>
        </div> 

        <!-- <div class="row">
          Major1: {{ major1_filter }}
          Major2: {{ major2_filter }}
          Year: {{ year_filter }}
          Interests: {{ interest_filter }}
        </div> -->

        <div class="row mt-3">
          <div class="col-12 col-xl-10"></div>
          <div class="col-12 col-xl-1">
              <button class="btn btn-warning w-100 mb-3" @click="clearFilter">Clear</button>
          </div>
          <div class="col-12 col-xl-1">
              <button class="btn btn-primary w-100" @click="filterUsers" :disabled="!hasFilters" data-bs-toggle="collapse" data-bs-target="#collapseFilter">Apply</button>
          </div>
        </div>
        
      </div>
    </div>

    <hr />

    <div class="row mt-3">
      <profilecard
        v-for="user in displayUsers"
        :key="user.id"
        :name="user.fullname"
        :firstmajor="user.firstmajor"
        :secondmajor="user.secondmajor"
        :year="user.year"
        :interests="user.interests"
        :profileURL="user.profileURL"
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
import Multiselect from '@vueform/multiselect'

export default {
  components: {
    profilecard,
    Navbar,
    LoadingScreen,
    Multiselect,
  },
  methods: {
    logoutUser: function () {
      setTimeout(() => {
        this.isLoading = true;
      }, 1000);
    },

    clearFilter() {
      this.major1_filter = ""
      this.major2_filter = ""
      this.year_filter = ""
      this.interest_filter = []
      this.filtered_users = this.users
    },

    filterUsers() {
      let user_arr = []

      if (this.hasFilters) {
        console.log("Filtering User")
        this.users.forEach((user) => {
          var filter = true
          if (this.major1_filter.length > 0) {
            console.log(`${user.fullname}: ${user.firstmajor}`)
            filter = filter && user.firstmajor == this.major1_filter
          }

          if (this.major2_filter.length > 0) {
            console.log(`${user.fullname}: ${user.secondmajor}`)
            filter = filter && user.secondmajor == this.major2_filter
          }

          if (this.year_filter > 0) {
            console.log(`${user.fullname}: ${user.year}`)
            filter = filter && user.year == this.year_filter
          }

          if (this.interest_filter.length > 0) {
            filter = filter && user.interests.some( ai => this.interest_filter.includes(ai) );
          }

          if (filter) {
            user_arr.push(user);
          }
          
        });
      }

      this.filtered_users = user_arr
    }
  },
  data() {
    return {
      // Array to store all users in database
      // To Include img src as well
      users: [
          // id: user.id,
          // fullname: userData.fullname,
          // firstmajor: userData.firstMajor,
          // secondmajor: userData.secondMajor,
          // year: userData.year,
          // interests: userData.interests,
          // profileURL: userData.profileURL
      ],
      filtered_users: [
        
      ],
      years: ["",1, 2, 3, 4, 5],
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
      interests: [
        "Artificial Intelligence",
        "Anthropology",
        "Blockchain",
        "Business Intelligence",
        "Communications",
        "Criminology",
        "Cultural Studies",
        "Cyber Security",
        "Data Science",
        "Econometrics",
        "Entrepreneurship",
        "Finance",
        "FinTech", 
        "Game Design", 
        "Geography",
        "Health Technology",
        "Investment Banking",
        "International Relations",
        "International Trade",
        "Law",
        "Literature",
        "Machine Learning",
        "Management",
        "Marketing",
        "Mathematics",
        "Operations Management",
        "Physics",
        "Political Science",
        "Public Policy",
        "Psychology",
        "Physics",
        "Real Estate",
        "Robotics",
        "Sociology",
        "Software Engineering",
        "Statistics",
        "Strategic Management",
        "Web 3.0"],

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
        this.filtered_users.forEach((user) => {
          if (user.fullname.includes(this.name_filter)) {
            user_arr.push(user);
          }
        });

        return user_arr;
      } else {
        return this.filtered_users;
      }
    },

    hasFilters() {
      return this.major1_filter.length > 0 || this.major2_filter.length > 0 || this.year_filter > 0 || this.interest_filter.length > 0
    }
  },

  // Onmounted
  async mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    const querySnapshot = await getDocs(collection(db, "profileDetails"));

    var temp_interest = new Set(this.interests)

    querySnapshot.forEach((user) => {
      // console.log(user.id, " => ", user.data());

      if (user.id != this.$store.state.user.email) {
        const userData = user.data();

        // console.log("Interests: ", user.data().interests)
        let userInterest = new Set(user.data().interests)
        temp_interest = new Set([...temp_interest, ...userInterest])

        const userObj = {
          id: user.id,
          fullname: userData.fullname,
          firstmajor: userData.firstMajor,
          secondmajor: userData.secondMajor,
          year: userData.year,
          interests: userData.interests,
          profileURL: userData.profileURL
        };

        this.users.push(userObj);
      }
    });

    this.interests = Array.from(temp_interest)
    this.filtered_users = this.users
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
