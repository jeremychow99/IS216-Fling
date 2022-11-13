<template>
  <div class="col-lg-4 col-sm-12 my-3">
    <div class="card" style="height:180px">
      <div class="card-body">
        <h5 class="card-title">{{ name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ creator }}</h6>
        <p class="card-text">
          {{ details.slice(0,40) }}<span v-if="this.details.length>40">...</span>
        </p>
        <div class="d-flex justify-content-between p-0">
          <div><i class="fa-solid fa-calendar"></i> {{ date }}</div>
          <div><i class="fa-solid fa-clock"></i> {{ time }}</div>
          <div><i class="fa-solid fa-location-dot"></i> {{ location }}</div>
        </div>
        <div class="d-grid gap-2">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            :data-bs-target="'#exampleModal' + key"
            style="margin-top: 10px"
          ><i class="fa-solid fa-circle-info me-2"></i>See Details
          </button>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      :id="'exampleModal' + key"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ name }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
          <div><strong>Description: </strong>{{details}}</div>
          <div class="my-2"><strong>Details: </strong>{{desc}}</div>
          
          <div class="d-flex justify-content-around my-2">
            <div><i class="fa-solid fa-calendar"></i> {{ date }}</div>
            <div><i class="fa-solid fa-clock"></i> {{ time }}</div>
            <div>
              <i class="fa-solid fa-location-dot"></i>
               {{ location }}
            </div>
          </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            ><i class="fa-solid fa-circle-xmark me-2"></i>Close
          </button>
            <button type="button" data-bs-dismiss="modal" class="btn btn-primary" @click="message">
              <i class="fa-solid fa-message me-2"></i>Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDocs, addDoc, query, collection, where } from "firebase/firestore";
import { db } from "../config"

export default {
  props: ["name", "details", "time", "date", "location", "desc", "creator", "creatorEmail", "key"],
  methods: {
    async message() {
            // Check if convo already exist
            // Sorted Participant Array to ensure that the order is also the same for querying purposes
            console.log(this.creatorEmail)
            let participants = [this.creatorEmail, this.$store.state.user.email].sort()
            
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
                
                convo_users[this.creatorEmail] = this.creator
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
  },
};
</script>

