<template>
    <Navbar />
    <LoadingScreen v-if="isLoading"/>
    <div v-if="!isLoading" class="container-fluid" style="width: 100%">
        <div class="row py-3 position-relative" style="background-color: #142d6b;">

            <router-link v-if="this.$route.params.id == this.$store.state.user.email" class="text-white position-absolute fs-3" :to="{ name: 'Setup' }" style="width: 30px; top: 30px; right:60px"><i class="fa-solid fa-pen rounded-circle border border-white border-3 p-2"></i></router-link>

            <!-- Image col -->
            <div class="col-12 col-xl-3 text-center">
                <img :src="profileURL" class="img-fluid img-thumbnail mt-4 mb-2 rounded-circle" style="z-index: 1; width: 150px; height: 150px;">
                <!-- <img :src="profileURL" class="img-fluid img-thumbnail mt-4 mb-2 rounded-circle" style="z-index: 1"> -->
            </div>

            <!-- Details col -->
            <div class="col-12 col-xl-9">
                <div class="text-white text-center text-xl-start mt-3">
                    <h3 class="text-capitalize">{{ fullname }}</h3>
                    <p class="my-1">Year {{ year }}</p>
                    <p class="my-1">{{ major1 }} Major 📈</p>
                    <p v-if="major2 != '' " class="my-1 text-muted">{{ major2 }} Second Major 📈</p>
                    <p>@{{ username }}</p>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="px-4 py-2 mt-2 mx-auto">
                <p class="lead fw-normal m-1 fs-2">Bio</p>
                <div class="p-4 rounded" style="background-color: #dee3f1;">
                    <p class="font-italic mb-1" style="font-size:large;">{{ bio }}</p>
                </div>
            </div>

            <hr>

            <div class="px-4 py-2">
                <p class="lead fw-normal m-1 fs-2">Interests</p>
                <div class="p-2 rounded" style="background-color: #dee3f1;"> <!--#f8f9fa-->
                    <!-- Dynamic Color Coding -->
                    <span v-for="(interest, i) of interests" :key="i" class="d-inline-block rounded-pill p-2 m-1" style="border: 1px solid #234d88; color: #234d88;">
                        {{ interest }}
                    </span>

                    <!-- <span class="d-inline-block rounded-pill p-2 m-1" style="border: 1px solid #234d88; color: #234d88;">
                        Cybersecurity
                    </span>

                    <span class="d-inline-block rounded-pill p-2 m-1" style="border: 1px solid #234d88; color: #234d88;">
                        Artificial Intelligence
                    </span> -->
                    
                </div>
            </div>
        </div>
            
        <hr>

    </div>    
</template>

<script>
import Navbar from "../components/Navbar.vue";
import LoadingScreen from "../components/loading.vue";
import { db } from "../config";
import { getDoc, doc } from "firebase/firestore"


export default {
    components: {
        Navbar,
        LoadingScreen,
    },
    data() {
        return {
            isLoading: true,
            bio: '',
            fullname: '',
            interests: [],
            major1: '',
            major2: '',
            profileURL: '',
            year: '',
            username: '',
        }
    },
    async mounted() {
        setTimeout(()=>{
            this.isLoading=false
        }, 1200)
        const docRef = doc(db, "profileDetails", this.$route.params.id);
        const docSnap = await getDoc(docRef);

        console.log(docSnap.data())

        this.bio = docSnap.data()['bio']
        this.fullname = docSnap.data()['fullname']
        this.interests = docSnap.data()['interests']
        this.major1 = docSnap.data()['firstMajor']
        this.major2 = docSnap.data()['secondMajor']
        this.profileURL = docSnap.data()['profileURL']
        this.year = docSnap.data()['year']
        this.username = docSnap.data()['username']
        
    }
}
</script>

