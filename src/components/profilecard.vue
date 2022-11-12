<template>
    <div class="col-xl-3 col-sm-6 mb-4 text-center">
        <div class="bg-light rounded shadow-sm py-3 px-4"><img :src="profileURL" alt="" style="width:80px; height:80px"
                class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
            <div style="height:150px">
                <h5 class="mb-2">{{ name }}</h5>
                <p class="small text-muted" style="margin-bottom: 8px">Year {{ year }}</p>
                <p class="small " style="font-size:15px; margin-bottom: 8px">{{ firstmajor }} </p>
                <p class="small text-muted" style="font-size:15px; margin-bottom: 8px">{{ secondmajor }} </p>
            </div>


            <hr>

            <h6>Interests</h6>
            <div style="height:120px">
                <span v-for="interest in interests.slice(0, 10)" :key="interest"
                    class="badge rounded-pill mx-1" :class=" interestCat[interest] ? interestCat[interest] : 'bg-dark' ">{{
                            interest
                    }}</span>
                <span v-if="interests.length > 5"><i class="fa-solid fa-ellipsis"></i></span>
            </div>


            <hr>

            <div class="row">
                <div class="col-6">
                    <!-- Use router-link -->
                    <router-link class="btn btn-outline-primary w-100 h-100" style="font-size:smaller;"
                        :to="{ name: 'Profile', params: { id: this.$.vnode.key } }">View Profile</router-link>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-outline-success w-100 h-100" style="font-size:smaller;"
                        @click="message">Message</button>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import { getDocs, addDoc, query, collection, where } from "firebase/firestore";
import { db } from "../config";

export default {
    data() {
        return {
            interestsOptions: [
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
        }
    },

    computed: {
        interestCat() {

            let interest2CatObj = {}

            const technology = ["Artificial Intelligence",
                "Blockchain",
                "Business Intelligence",
                "Cyber Security",
                "Data Science",
                "FinTech", 
                "Health Technology", 
                "Machine Learning", 
                "Robotics", 
                "Software Engineering", 
                "Web 3.0"]

            const business = ["Entrepreneurship", 
                              "Finance", 
                              "International Trade", 
                              "Investment Banking", 
                              "Management", 
                              "Marketing", 
                              "Operations Management", 
                              "Real Estate", 
                              "Strategic Management"]

            const socialScience = ["Anthropology", 
                                   "Communications", 
                                   "Criminology", 
                                   "Cultural Studies", 
                                   "History", 
                                   "International Relations", 
                                   "Political Science", 
                                   "Psychology", 
                                   "Sociology"]

            const humanities = ["Geography", 
                                "Literature", 
                                "Philosophy"]
                                
            const law = ["International Law", 
                        "Law", 
                        "Public Policy"]

            for (let interest of this.interestsOptions) {

                if (technology.includes(interest)) {

                    interest2CatObj[interest] = "bg-primary"

                } else if (business.includes(interest)) {

                    interest2CatObj[interest] = "bg-info"

                }
                else if (socialScience.includes(interest)) {

                    interest2CatObj[interest] = "bg-success"

                }

                else if (humanities.includes(interest)) {

                    interest2CatObj[interest] = "bg-warning"

                }
                else if (law.includes(interest)) {

                    interest2CatObj[interest] = "bg-secondary"

                } else {

                    interest2CatObj[interest] = "bg-danger"

                }

            }

            return interest2CatObj

        }
    },
    props: ['name', 'firstmajor', 'secondmajor', 'year', 'interests', 'profileURL'],
    methods: {
        async message() {
            // Check if convo already exist
            // Sorted Participant Array to ensure that the order is also the same for querying purposes

            let participants = [this.$.vnode.key, this.$store.state.user.email].sort()

            console.log(participants)

            let convo_id = "";
            const q = query(collection(db, "convos"), where("participants", "==", participants));

            // console.log("Querying convo...")
            const querySnapshot = await getDocs(q);

            console.log("Checking convo...")
            if (!querySnapshot.empty) {
                console.log("Convo Found!")
                // Convo Exist, Store Convo Id
                querySnapshot.forEach((convo) => {
                    convo_id = convo.id
                    console.log(convo.id, "=>", convo.data())
                })

            } else {
                console.log("Creating New Convo")
                // Convo Doesnt Exist, Create New Convo and Store Convo Id

                let convo_users = {}

                convo_users[this.$.vnode.key] = this.name
                convo_users[this.$store.state.user.email] = this.$store.state.user.displayName

                console.log(convo_users)

                const convoRef = await addDoc(collection(db, "convos"), {
                    participants: participants,
                    convo_users: convo_users,
                    lastmsgtime: Date.now()
                });

                convo_id = convoRef.id
                console.log("Newly Created Convo: ", convoRef.id)

            }

            // Redict to Chatroom
            this.$router.push({ name: 'Chatroom', params: { id: convo_id } })
        }
    }
}
</script>