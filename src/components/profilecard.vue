<template>
    <div class="col-xl-3 col-sm-6 mb-4 text-center">
        <div class="bg-light rounded shadow-sm py-3 px-4"><img src="https://bootstrapious.com/i/snippets/sn-team/teacher-4.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
            <div style="height:70px">
                <h5 class="mb-2">{{ name }}</h5><span class="small text-uppercase text-muted" style="font-size:12px;">Degree: {{ major }} (Year {{ year }})</span>
            </div>
            

            <hr>

            <h6>Interests</h6>
            <div style="height:120px">
                <span v-for="(interest, index) in interests" :key="index" class="badge rounded-pill bg-dark mx-1">{{ interest }}</span>
            </div>


            <hr>

            <div class="row">
                <div class="col-6">
                    <!-- Use router-link -->
                    <router-link class="btn btn-outline-primary w-100 h-100" style="font-size:smaller;" :to="{ name: 'Profile', params: { id: this.$.vnode.key}}">View Profile</router-link>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-outline-success w-100 h-100" style="font-size:smaller;" @click="message">Message</button>
                </div>
            </div>
            
        </div>
    </div>
    
</template>

<script>
import { getDocs, addDoc, query, collection, where } from "firebase/firestore";
import { db } from "../config";

export default {
    props: ['name', 'major', 'year', 'interests'],
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
            this.$router.push({ name: 'Chatroom', params: { id: convo_id} })           
        }
    }
}
</script>