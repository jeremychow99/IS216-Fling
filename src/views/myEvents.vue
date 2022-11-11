<template>
  <Navbar @logout="logoutUser" />
  <div><LoadingScreen v-if="isLoading"></LoadingScreen></div>
  <div v-if="!isLoading" class="container justify-content-center">
    <router-link class="btn btn-primary" :to="{ name: 'Events' }"
      >to events feed</router-link
    >
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
      for(let item of this.events){
        console.log(item)
        if(item.eventID == s){
          this.events.pop(item)
        }
      }
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
    });
  },
};
</script>
