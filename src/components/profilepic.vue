<template>
    <div class="container mt-3 col-lg-6">
        <h1 class="text-center">
            Setting Up Your Profile
        </h1>
        <!--preview of profile picture-->
        <img id="previewProfile" src="https://placekitten.com/300/300" class="mx-auto d-block my-2"
            style="border-radius: 50%" @change="showPreview($event);">

        <!--upload pic function-->
        <div class="mb-3">
            <div class="input-group">
                <input type="file" class="form-control" id="formFile" aria-describedby="inputGroupFileAddon04"
                    accept="image/*" aria-label="Upload" @change="onFileChange">
                <button class="btn btn-outline-secondary" type="button" id="uploadbtn" @click="clickTrue">
                    Upload
                </button>
            </div>
        </div>

        <!--choose major-->
        <div class="col-md col-lg-6 my-3">
            <div class="form-floating">
                <select class="form-select" id="major">
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
        <div class="col-md col-lg-6 mb-3">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="userBio"
                    style="height: 100px"></textarea>
                <label for="userBio">Bio</label>
            </div>
        </div>

        <!--next part interests-->
        <div class="doneBtn text-center mb-3">
            <button class="rounded btn btn-primary" id="doneBtn" onclick="location.href='interests.html'">Next</button>
        </div>

    </div>
</template>

<script>

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db } from "@/config";

import { getAuth } from "firebase/auth";

export default {
    data() {
        return {
            filename: "",
        }
    },
    methods: {
        showPreview(event) {
            // idk how to resize picture after upload to give a preview
            // 1. can force users to upload only 300px by 300px
            if (event.target.files.length > 0) {
                const src = URL.createObjectURL(event.target.files[0]);
                var preview = document.getElementById("previewProfile");
                preview.src = src;
            }
        },

        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            console.log(files)
            this.filename = files[0].name
            console.log(this.filename)
        },

        clickTrue() {

            var file = document.getElementById("formFile")

            const storage = getStorage();

            const storageRef = ref(storage, "images/" + this.filename);

            const uploadTask = uploadBytesResumable(storageRef, file);

            // To upload and obtain download URL
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },

                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/cancelLed':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },

                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        // right after that, link downloadURL to document with specific id 
                        const auth = getAuth()
                        const user = auth.currentUser;
                            if (user) {
                                // User is signed in, see docs for a list of available properties
                                // https://firebase.google.com/docs/reference/js/firebase.User
                                const email = user.email;
                                console.log(email)
                                const testRef = db.collection('profileDetails').doc('test@gmail.com');
                                const res = await testRef.update({photoURL: downloadURL});

                            } else {
                                // User is signed out
                                // ...
                            }
                        
                    });
                },
            )


        }
    },

}


</script>
