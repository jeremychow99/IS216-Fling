<template>
    
    <div class="col-10 col-sm-10 col-lg-10" style="position: relative;">
        <div class="row align-items-center my-2">
            <div id="title" class="col-2  text-center">
                <strong class="fs-3">{{ userName }}</strong>
            </div>
        </div>

        <hr>

        <div class="mx-2" style="height: 80vh">
            <!-- {{ messages }} -->
            <message
            v-for="message of messages"
            :key="message.id"
            :senderName="message.senderName"
            :sender="this.$store.state.user.email === message.senderID"
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
</template>

<script>
import { db } from "../config";
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore"
import store from "../store"


import message from '../components/message.vue'

const messagesCollection = collection(db, "chats")

export default {
    components: {
        message
    },
    props: ['userName'],

    data() {
        return {
            messages: [],
            message: '',
            user: null,
        }
    },

    methods: {
        getChat() {
            console.log(this.$route.params.id)
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
            }
            
        }
    },

    created() {
        this.getChat()
        console.log(this.$route.params)
        // this.user = this.$route.params
    },
}

</script>