<template>
  <div class="container mt-3 col-lg-6">
    <h1 class="text-center">Setting Up Your Profile</h1>
    <!--preview of profile picture-->
    <div class="mb-3" style="display: flex; justify-content: center; align-items: center;">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/is216-proj-v1.appspot.com/o/images%2Fuser.png?alt=media&token=e5307efb-4818-4724-8da6-58113c302507"
        id="initialDisplayPic" style="height: 200px">
      <canvas hidden style="height: 200px"></canvas>
    </div>

    <!--upload pic function-->
    <div class="mb-3">
      <div class="input-group">
        <input type="file" class="form-control" id="formFile" aria-describedby="inputGroupFileAddon04" accept="image/*"
          aria-label="Upload" @change="onFileChange" />
        <button class="btn btn-outline-primary" type="button" id="uploadbtn" @click="uploadImage">
          Upload Picture
        </button>
      </div>
    </div>

    <!--first major-->
    <div class="col-md mb-3">
      <label for="major1DataList" class="form-label">Your First Major</label>
      <input class="form-control" list="major1Options" id="major1DataList" placeholder="Type to search..."
        v-model="userFirstMajor">
      <datalist id="major1Options">
        <option v-for="(major, index) of major1" :key="index" :value="major"></option>
      </datalist>
    </div>

    <!--second major-->
    <div class="col-md mb-3">
      <label for="major2DataList" class="form-label">Your Second Major</label>
      <input class="form-control" list="major2Options" id="major1DataList" placeholder="Type to search..."
        v-model="userSecondMajor">
      <datalist id="major2Options">
        <option v-for="(major, index) of major2" :key="index" :value="major"></option>
      </datalist>
    </div>

    <!--user's input bio-->
    <div class="col-md mb-3">
      <label for="userBio" class="mb-2">Your Bio</label>
      <div class="form-floating">
        <textarea v-model="userBio" class="form-control" id="userBio" style="height: 100px" maxlength="100"></textarea>
      </div>
    </div>

    <div class="row">

      <div class="col-md mb-3">
        <p class="mb-2">Your Interests</p>
        <Multiselect v-model="userInterests" mode="multiple" placeholder="Choose your interests" :options="interests" />
      </div>

      <div class="col-md mb-3">
        <label for="userYear" class="mb-3">Year </label>
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
        Next
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
import { doc, updateDoc } from "firebase/firestore";
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
        "N.A.",
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
        "Blockchain",
        "Business Intelligence",
        "Cyber Security",
        "Data Science",
        "Econometrics",
        "Entrepreneurship",
        "Finance",
        "FinTech",
        "Investment Banking",
        "Law",
        "Machine Learning",
        "Management",
        "Marketing",
        "Mathematics",
        "Political Science",
        "Psychology",
        "Software Engineering",
        "Web 3.0"],
      file: null,
      userBio: "",
      userFirstMajor: "",
      userSecondMajor: "",
      userInterests: [],
      userYear: 0,
    };
  },
  computed: {
    userProfile() {
      return getAuth().currentUser.photoURL;
    },
  },
  components: { Multiselect },
  methods: {
    async sendProfileData() {
      console.log(store.state.user.email);
      console.log('sending data')
      const docRef = doc(db, "profileDetails", store.state.user.email);
      await updateDoc(docRef, {
        bio: `${this.userBio}`,
        firstMajor: `${this.userFirstMajor}`,
        secondMajor: `${this.userSecondMajor}`,
        interests: `${this.userInterests}`,
        year: `${this.userYear}`

      })
      router.push('/');
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (files.length != 0) {
        console.log(files);
        this.file = files[0];
        console.log(this.file);

        var initialDisplayPic = document.getElementById("initialDisplayPic")
        initialDisplayPic.hidden = true

        const file = e.target.files[0];
        // let's load the image data
        const canvas = document.querySelector('canvas');
        const image = new Image();
        image.onload = () => {
          // use min size so we get a square

          const size = Math.min(image.naturalWidth, image.naturalHeight);

          // let's update the canvas size
          canvas.width = size;
          canvas.height = size;

          // draw image to canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0);

          // only draw image where mask is
          ctx.globalCompositeOperation = 'destination-in';

          // draw our circle mask
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(
            size * 0.5, // x
            size * 0.5, // y
            size * 0.5, // radius
            0, // start angle
            2 * Math.PI // end angle
          );
          ctx.fill();

          // restore to default composite operation (is draw over current image)
          ctx.globalCompositeOperation = 'source-over';

          // show canvas
          canvas.hidden = false;

        },
          image.src = URL.createObjectURL(file)
      }
      else {
        const canvas = document.querySelector('canvas');
        const image = new Image();
        image.onload = () => {
          // use min size so we get a square

          const size = Math.min(image.naturalWidth, image.naturalHeight);

          // let's update the canvas size
          canvas.width = size;
          canvas.height = size;

          // draw image to canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0);

          // only draw image where mask is
          ctx.globalCompositeOperation = 'destination-in';

          // draw our circle mask
          ctx.fillStyle = '#000';
          ctx.beginPath();
          ctx.arc(
            size * 0.5, // x
            size * 0.5, // y
            size * 0.5, // radius
            0, // start angle
            2 * Math.PI // end angle
          );
          ctx.fill();

          canvas.hidden = false

          // restore to default composite operation (is draw over current image)
          ctx.globalCompositeOperation = 'source-over';
        }
        image.src = "https://firebasestorage.googleapis.com/v0/b/is216-proj-v1.appspot.com/o/images%2Fuser.png?alt=media&token=e5307efb-4818-4724-8da6-58113c302507"
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
