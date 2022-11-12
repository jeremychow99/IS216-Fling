<template>
  <div class="container mt-3 col-lg-6">
    <h1 class="text-center">Setting Up Your Profile</h1>
    <!--preview of profile picture-->
    <div class="mb-3" style="display: flex; justify-content: center; align-items: center;">
      <img :src="userProfile" class="mx-auto d-block rounded-circle" style="height: 200px; width: 200px">
    </div>

    <!-- Info box for uploading Images -->
    <div class="alert alert-info d-flex">
      <div>
        <i class="fa-solid fa-circle-info"></i>
      </div>
      <p class="ms-3 mb-0">
        Did you know? Having a professional profile photo allows you to make solid first impression to your network and makes you <u><strong>36 times</strong></u> more likely to be contacted!
        <br>
        <br>
        Do remember to preview your profile photo before uploading. The recommended profile picture size is <u><strong>320 x 320 pixels</strong></u>.      
      </p>
    </div>

    <!--upload pic function-->
    <div class="mb-3">
      <div class="input-group">
        <input type="file" class="form-control" id="formFile" ref="fileupload" aria-describedby="inputGroupFileAddon04" accept="image/*"
          aria-label="Upload" @change="onFileChange" />
        <button class="btn btn-outline-primary" type="button" id="uploadbtn" @click="uploadImage">
          Upload Picture
        </button>
      </div>
    </div>

    <!--first major-->
    <div class="col-md mb-3">
      <label for="major1DataList" class="form-label">Your First Major</label>
      <Multiselect
      v-model="userFirstMajor"
      placeholder="Type to search..."
      :searchable=true
      :options="major1"
      />
    </div>

    <!--second major-->
    <div class="col-md mb-3">
      <label for="major2DataList" class="form-label">Your Second Major</label>
      <Multiselect
      v-model="userSecondMajor"
      placeholder="Type to search..."
      :searchable=true
      :options="major2"
      />
    </div>

    <!--user's input bio-->
    <div class="col-md mb-3">
      <label for="userBio" class="mb-2">Your Bio ({{ userBio.length }}/280)</label>
      <textarea v-model="userBio" class="form-control" id="userBio" style="height: 100px" maxlength="280"></textarea>
    </div>

    <div class="row">

      <div class="col-md mb-3">
        <label class="form-label">Your Interests ({{ userInterests.length }}/15)</label>
        <Multiselect 
        v-model="userInterests" 
        mode="tags" 
        placeholder="Choose your interests" :close-on-select="false"
        :searchable="true"
        :max="15" 
        :create-option="true" :options="interests" />
      </div>

      <div class="col-md mb-3">
        <label for="userYear" class="mb-2">Year </label>
        <select class="form-select" v-model="userYear">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
        </select>
      </div>

    </div>


    <div class="doneBtn text-center mb-3">
      <button class="rounded btn btn-primary" id="doneBtn" @click="sendProfileData">
        Update
      </button>
    </div>
  </div>
</template>

<script>
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import store from "../store";
import { db } from "@/config";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import router from "../router/index";
import Multiselect from '@vueform/multiselect'

export default {
  data() {
    return {
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
        "Information Systems",
        "Information Systems (Business Analytics)",
        "Information Systems (Digitalisation & Cloud Solutions)",
        "Information System (Financial Technology)",
        "Information Systems (Business Analytics & Digitalisation & Cloud Solutions)",
        "Information Systems (Digitalisation & Cloud Solutions & Financial Technology)",
        "Information System (Business Analytics & Financial Technology)",
        "Smart City Management & Technology",
        "Computer Science",
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
        "",
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
      file: null,
      userBio: "",
      userFirstMajor: "",
      userSecondMajor: "",
      userInterests: [],
      userYear: 0,
      userProfile: this.$store.state.user.photoURL
    };
  },
  computed: {

  },
  components: { Multiselect },
  async mounted() {
    console.log(this.$store.state.user)
    
    const docRef = doc(db, "profileDetails", this.$store.state.user.email);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
    this.userBio = docSnap.data()['bio']
    this.userFirstMajor = docSnap.data()['firstMajor']
    this.userSecondMajor = docSnap.data()['secondMajor']
    this.userInterests = docSnap.data()['interests']
    this.userYear = docSnap.data()['year']

  },

  methods: {
    async sendProfileData() {
      console.log(store.state.user);
      console.log(store.state.user.photoURL);
      console.log('sending data')
      const docRef = doc(db, "profileDetails", store.state.user.email);
      await updateDoc(docRef, {
        bio: this.userBio,
        firstMajor: this.userFirstMajor,
        secondMajor: this.userSecondMajor,
        interests: this.userInterests,
        year: this.userYear,
        profileURL: store.state.user.photoURL
      })
      router.push('/');
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (files.length != 0) {
        console.log("Image change detected")

        this.file = e.target.files[0];

        console.log(URL.createObjectURL(this.file))
        
        this.userProfile = URL.createObjectURL(this.file)
      }
      else {
        
        console.log("Image Clear detected")
        console.log(files)
        this.file = null
        console.log(this.$store.state.user.photoURL)
        this.userProfile = this.$store.state.user.photoURL

      }
    },


    uploadImage() {
      console.log(this.file);
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + this.file.name);
      const uploadTask = uploadBytesResumable(storageRef, this.file);
      // To upload and obtain download URL
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },

        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/cancelLed":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },

        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);

            // right after that, link downloadURL to document with specific id
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              updateProfile(user, {
                photoURL: downloadURL,
              })
              .then(() => {
                console.log("Profile Updated");
                console.log(user.photoURL);
                
                store.dispatch("updatePhotoURL", downloadURL)

                this.userProfile = downloadURL

                this.$refs.fileupload.value = null;

                alert("Profile Picture Uploaded")
              })
              .catch((error) => {
                console.log(error.message);
              });
            } else {
              // User is signed out
              // ...
            }
          });
        }
      );
    },
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css">

</style>
