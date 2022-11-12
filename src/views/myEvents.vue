<template>
  <Navbar @logout="logoutUser" />
  <div><LoadingScreen v-if="isLoading"></LoadingScreen></div>
  <div v-if="!isLoading" class="container justify-content-center">
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
          <router-link class="btn btn-default" :to="{ name: 'Events' }">
            Events Feed
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="#">Your Events</a>
      </li>
    </ul>

    <div class="row">
      <div class="col-lg-12 col-sm-12">
        <button
          type="button"
          class="btn btn-primary my-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style="float: right;"
        >
        <i class="fa-solid fa-plus"></i> Add Another Event
        </button>
      </div>
    </div>

    <div class="row">
      <div class="row">
        <myEventCard
          v-for="event of displayEvents"
          :key="event.eventID"
          :name="event.eventName"
          :details="event.eventDetails"
          :time="event.eventTime"
          :date="event.eventDate"
          :location="event.eventLocation"
          :desc="event.eventDesc"
          :email="event.creatorEmail"
          @deleteEvent="deleteEvent"
        >
        </myEventCard>
      </div>
    </div>
    <div v-if="this.events.length == 0"><h1 class="display-2 text-center">You have not created any events!</h1></div>

  </div>
</template>

<script>
import { db } from "../config";
import { getDocs, collection, deleteDoc } from "firebase/firestore";
import myEventCard from "../components/myEventCard.vue";
import Navbar from "../components/Navbar.vue";
import LoadingScreen from "../components/loading.vue";
import { doc, setDoc } from "firebase/firestore";

export default {
  components: {
    myEventCard,
    Navbar,
    LoadingScreen,
  },
  data() {
    return {
      events: [],
      isLoading: true,
      inputLocation: "",
      inputDetails: "",
      inputDate: "",
      inputTime: "",
      inputName: "",
      inputDesc: "",
      inputCreator: "",
    };
  },
  methods: {
    deleteEvent: function (s){
      console.log(s)
      for (let index = 0; index < this.events.length; index++) {
        if(this.events[index].eventID== s){
          this.events.splice(index,1)
        }
        
      }
      // for(let item of this.events){
      //   console.log(item)
      //   if(item.eventID == s){
      //     this.events.pop(item)
      //   }
      // }
    },
   
    logoutUser: function () {
      setTimeout(() => {
        this.isLoading = true;
      }, 1000);
    },
  },
  computed: {
    displayEvents() {
      return this.events;
    },
  },
  async mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((event) => {
      const eventData = event.data();
      const eventObj = {
        eventID: event.id,
        eventDate: eventData.eventDate,
        eventDetails: eventData.eventDetails,
        eventName: eventData.eventName,
        eventLocation: eventData.eventLocation,
        eventTime: eventData.eventTime,
        eventDesc: eventData.eventDesc,
        eventCreator: eventData.creator,
      };

      if (eventObj.eventCreator == this.$store.state.user.displayName) {
        this.events.push(eventObj);
      }
      console.log(this.events)
    });
  },
};
</script>
