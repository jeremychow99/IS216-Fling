<template>
    <div class="col-10 col-sm-10 col-lg-10">
        <div class="row align-items-center my-2">
            <div id="title" class="col-2  text-center">
                <strong class="fs-3">Chats</strong>
            </div>
            
            <div class="col-10">
                <input type="text" class="form-control w-75 mx-auto rounded-pill my-4 fontAwesome" placeholder="&#xf002; Search for Chats..." aria-label="search" aria-describedby="button-search" v-model="chat_filter">
            </div>
        </div>

        <!-- Main Chats -->
        <div class="row mt-3">
            <ul v-if="convos.length > 0" class="list-group">
                <router-link class="list-group-item" :to="{ name: 'Chatroom', params: { id: 'test'}}">
                    <div>
                        <!-- Follow tele layout? -->
                        <!-- Profile Image -->
                        <!-- Name -->
                        <!-- Last convo time? -->
                    </div>
                </router-link>
                <convo
                    v-for="convo in convos"
                    :key="convo.id"
                    :userObj="convo.receiver"
                    :lastmsgtime="convo.lastmsgtime"
                />
            </ul>
            <div v-else>
                No Conversations Found!
            </div>
            {{ convos }}
        </div>
    </div>
</template>

<script>
import convo from "../components/convo.vue"
import { db } from "../config";
import { getDocs, collection, query, where, getDoc, doc } from "firebase/firestore"

export default {
    components: {
        convo
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

                let convo_arr = []
                this.convos.forEach(convo => {
                    if (convo.name.includes(this.chat_filter)) {
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
        async loadUsers() {

            console.log("Loading Users")
            this.convos.forEach((convo, index) => {

                console.log(convo)
                let userID = convo.participants.filter((ele) => ele != this.$store.state.user.email)[0]

                console.log("Loading: ", userID)

                this.getUser(userID, index);
                
            })

        },

        async getUser(userID, index) {

            const userRef = doc(db, "profileDetails", userID);
            const docSnap = await getDoc(userRef);

            this.convos[index].receiver = docSnap.data()
        },

        async loadConvos() {

            const convoQuery = query(collection(db, "convos"), where("participants", "array-contains", this.$store.state.user.email))

            const querySnapshot = await getDocs(convoQuery);
            querySnapshot.forEach((convo) => {
                // console.log(convo.id, " => ", convo.data());

                const convoData = convo.data()

                const convoObj = {
                    id: convo.id,
                    lastmsgtime: convoData.lastmsgtime,
                    participants: convoData.participants
                }

                this.convos.push(convoObj)
            });

            console.log("Convo Load Completed")
            console.log(this.convos)

        }
    },

    async mounted() {

        await this.loadConvos()
        await this.loadUsers()

    }
}
</script>