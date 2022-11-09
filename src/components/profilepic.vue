<template>
  <div class="container mt-3 col-lg-6">
    <h1 class="text-center">Setting Up Your Profile</h1>
    <!--preview of profile picture-->
    <div class="mb-3" style="display: flex; justify-content: center; align-items: center;">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/is216-proj-v1.appspot.com/o/images%2Fuser.png?alt=media&token=e5307efb-4818-4724-8da6-58113c302507"
        id="initialDisplayPic" style="height: 300px">
      <canvas hidden style="height: 300px"></canvas>
    </div>

    <!--upload pic function-->
    <div class="mb-3">
      <div class="input-group">
        <input type="file" class="form-control" id="formFile" aria-describedby="inputGroupFileAddon04" accept="image/*"
          aria-label="Upload" @change="onFileChange" />
        <button class="btn btn-outline-secondary" type="button" id="uploadbtn" @click="uploadImage">
          Upload
        </button>
      </div>
    </div>

    <!--choose major-->
    <div class="col-md my-3">
      <div class="form-floating">
        <select class="form-select" id="major" v-model="userMajor">
          <option value="accountancy">Accountancy</option>
          <option value="businessManagement">Business Management</option>
          <option value="economics">Economics</option>
          <option value="computerScience">Computer Science</option>
          <option value="informationSystems">Information Systems</option>
          <option value="socialSciences">Social Sciences</option>
        </select>
        <label for="major">Major</label>
      </div>
    </div>

    <!--user's input bio-->
    <div class="col-md mb-3">
      <div class="form-floating">
        <textarea v-model="userBio" class="form-control" placeholder="Leave a comment here" id="userBio"
          style="height: 100px"></textarea>
        <label for="userBio">Bio</label>
      </div>
    </div>

    <!--next part interests-->
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
import router from "../router/index"
export default {
  data() {
    return {
      file: null,
      userBio: "",
      userMajor: ""
    };
  },
  computed: {
    userProfile() {
      return getAuth().currentUser.photoURL;
    },
  },
  methods: {
    async sendProfileData() {
      console.log(store.state.user.email);
      console.log('sending data')
      const docRef = doc(db, "profileDetails", store.state.user.email);
      await updateDoc(docRef, {
        bio: `${this.userBio}`,
        major: `${this.userMajor}`,
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
