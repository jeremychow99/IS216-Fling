<template>
    <Navbar/>
    <div class="container">
        <div class="row align-items-center my-2">
            <div id="title" class="col-2  text-center">
                <strong class="fs-3">Chats</strong>
            </div>
            
            <div class="col-10">
                <input type="text" class="form-control w-75 mx-auto rounded-pill my-4 fontAwesome" placeholder="&#xf002; Search for Chats..." aria-label="search" aria-describedby="button-search" v-model="chat_filter">
            </div>
        </div>

        <hr>
        <!-- Main Chats -->
        <div class="row mt-3">
            <ul v-if="displayConvos.length > 0" class="list-group">
                <convo
                    v-for="convo in convos"
                    :key="convo.id"
                    :user="convo.receiver"
                    :lastmsgtime="convo.lastmsgtime"
                />
            </ul>
            <div v-else>
                <h1 class="display-2 text-center">No Conversations Found!</h1>
            </div>
        </div>
    </div>
</template>

<script>
import convo from "../components/convo.vue"
import { db } from "../config";
import { getDocs, collection, query, where } from "firebase/firestore"
import Navbar from "../components/Navbar.vue";
export default {
    components: {
        convo,
        Navbar,
    },
    data() {
        return {
            convos: [

            ],
            chat_filter: ''
        }
    },

    computed: {
        displayConvos() {
            if (this.chat_filter.length) {
                console.log("Filtering")
                let convo_arr = []
                this.convos.forEach(convo => {
                    console.log(convo.receiver)
                    if (convo.receiver.includes(this.chat_filter)) {
                        convo_arr.push(convo)
                    }
                })

                return convo_arr

            } else {

                return this.convos

            }    
        }
    },

    methods: {
        async loadConvos() {

            console.log(this.$store.state.user.email)
            const convoQuery = query(collection(db, "convos"), where("participants", "array-contains", this.$store.state.user.email))

            const querySnapshot = await getDocs(convoQuery);
            querySnapshot.forEach((convo) => {
                console.log(convo.id, " => ", convo.data());

                const convoData = convo.data()

                // Person who user is talking to in the conversation
                let convo_participants = convoData.convo_users
                let receiver = ''

                for (let user in convo_participants) {
                    if (user != this.$store.state.user.email) {
                        receiver = convo_participants[user]
                    }
                }

                const convoObj = {
                    id: convo.id,
                    lastmsgtime: convoData.lastmsgtime,
                    participants: convoData.participants,
                    receiver: receiver
                }

                this.convos.push(convoObj)
            });

            console.log("Convo Load Completed")
            console.log(this.convos)

        }
    },

    created() {

        this.loadConvos()

    }
}
</script>