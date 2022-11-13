<template>
    <Navbar />
    <div class="container">
        <div class="row align-items-center my-2">
            <div class="py-2 border-bottom" style="position: relative;">
                <img src="https://firebasestorage.googleapis.com/v0/b/is216-proj-v1.appspot.com/o/images%2Fuser.png?alt=media&token=e5307efb-4818-4724-8da6-58113c302507" alt="" width="40" class="rounded-circle me-3 shadow-1-strong">
                <span>
                    <strong class="fs-5">{{ userName }}</strong>
                </span>

                <!-- <div class="d-inline">
                    <button class="btn" type="button" id="viewProfile" data-bs-toggle="dropdown" aria-expanded="false" style="position: absolute; right: 20px;">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    
                    <div class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="viewProfile">
                        <router-link id="profile" class="dropdown-item" :to="{ name: 'Profile', params: {id: userID} }">View Profile</router-link>
                    </div>
                </div> -->
                
      
            </div>
            
        </div>

        <div style="height: 75vh; position: relative;">
            <div id="msg-container" class="mx-2" style="height: calc(100% - 80px)">
            <message
            v-for="message of messages"
            :key="message.id"
            :senderName="message.senderName"
            :sender="this.$store.state.user.email === message.senderID"
            :timestamp="message.timestamp"
            >
                {{ message.content }}
            </message>
            </div>
            
            <hr>

            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Message" aria-label="Message" aria-describedby="button-addon2" v-model="message" required>
                <button class="btn btn-success" type="button" id="button-addon2" :disabled="message.length == 0" @click="sendMessage">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../config";
import { collection, query, where, onSnapshot, addDoc, getDoc, doc, updateDoc } from "firebase/firestore"
import store from "../store"
import Navbar from "../components/Navbar.vue";
import { nextTick } from "vue"
import router from "../router/index.js"


import message from '../components/message.vue'

const messagesCollection = collection(db, "chats")
const convosCollection = collection(db, "convos")

export default {
    components: {
        message,
        Navbar
    },

    data() {
        return {
            messages: [],
            message: '',
            userName: null,
            userID: '',
        }
    },

    methods: {
        getChat() {
            const messagesQuery = query(messagesCollection, where("convoID", "==", this.$route.params.id))

            onSnapshot(messagesQuery, (querySnapshot) => {
                const temp_messages = [];
                querySnapshot.forEach((doc) => {
                    const msg = {
                        id: doc.id,
                        ...doc.data(),
                    }
                    temp_messages.push(msg)
                })

                temp_messages.sort((a,b) => a.timestamp - b.timestamp)
                this.messages = temp_messages
            })
        },

        async getConvo() {

            const docRef = doc(db, "convos", this.$route.params.id);
            const docSnap = await getDoc(docRef);

            let userName = ''
            let userID = ''
            
            let convo_participants = docSnap.data()['convo_users']

            for (let user in convo_participants) {
                if (user != this.$store.state.user.email) {
                    userName = convo_participants[user]
                    userID = user
                }
            }

            this.userID = userID
            this.userName = userName

            console.log(this.userID)

        },

        sendMessage() {

            // User logged in
            // DisplayName does not exists (Need add in)
            console.log(this.$store.state.user.displayName)

            if (store.state.user != null) {

                console.log("Sending Text")
                addDoc(messagesCollection, {
                    content: this.message,
                    convoID: this.$route.params.id,
                    senderID: this.$store.state.user.email,
                    senderName: this.$store.state.user.displayName, 
                    timestamp: Date.now()
                })

                this.message = ''

                const docRef = doc(db, "convos", this.$route.params.id);

                updateDoc(docRef, {
                    lastmsgtime: Date.now()
                })
            }
            
        },

        toProfile() {
            console.log("Redirecting")
            this.$router.push({name: 'Profile', params: { id: this.userID }})
        }
    },

    created() {
        this.getChat()
        this.getConvo()
        // this.user = this.$route.params
    },

    watch: {
        messages() {

            nextTick(() => {
                let element = document.querySelector("#msg-container")
                element.scrollTop = element.scrollHeight - element.clientHeight;
                // element.scrollIntoView({behavior: 'smooth'});    

                console.log("Message Updated")
            });
            
        }
    }
}

</script>


<style>

#msg-container {
    overflow-y: auto;
    overflow-x: hidden;
    animation: hide-scroll 3s;
}
    
@keyframes hide-scroll {
    from,
    to {
        overflow-y: hidden;
    }
}

</style>