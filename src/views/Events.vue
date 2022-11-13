<template>
  <Navbar @logout="logoutUser" />
  <div><LoadingScreen v-if="isLoading"></LoadingScreen></div>
  <div v-if="!isLoading" class="container justify-content-center">
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <a class="nav-link active" href="#">Events Feed</a>
      </li>
      <li class="nav-item">
        <router-link class="btn btn-default" :to="{ name: 'myEvents' }">
          Your Events
        </router-link>
      </li>
    </ul>

    <div class="row">
      <lottie-player
        autoplay
        loop
        src="https://assets6.lottiefiles.com/packages/lf20_ieyjhrgh.json"
        class="col-lg-12 col-sm-12 justify-content-center"
        style="height: 300px"
      >
      </lottie-player>
    </div>
    <!-- <div class="row">
      <div class="col-lg-6 col-sm-12">
        <button
          type="button"
          class="btn btn-primary my-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Your Own Event!
        </button>
      </div>
    </div> -->
    <div class="row">
      <EventCard
        v-for="eventobj of displayEvents"
        :key="eventobj.eventID"
        :name="eventobj.eventName"
        :details="eventobj.eventDetails"
        :time="eventobj.eventTime"
        :date="eventobj.eventDate"
        :location="eventobj.eventLocation"
        :desc="eventobj.eventDesc"
        :creator="eventobj.eventCreator"
        :creatorEmail="eventobj.creatorEmail"
      >
      </EventCard>
    </div>
  </div>

</template>

<script>
import { db } from "../config";
import { getDocs, collection, addDoc, doc } from "firebase/firestore";
import EventCard from "../components/eventcard.vue";
import Navbar from "../components/Navbar.vue";
import LoadingScreen from "../components/loading.vue";

import store from "../store";

export default {
  components: {
    EventCard,
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
    addEvent: async function () {
      // console.log(this.inputTime)
      // console.log(this.inputDate)
      // console.log(typeof this.inputTime)
      // console.log(typeof this.inputDate)
      await addDoc(collection(db, "events"), {
        eventName: this.inputName,
        eventDate: this.inputDate,
        eventTime: this.inputTime,
        eventDesc: this.inputDesc,
        eventDetails: this.inputDetails,
        eventLocation: this.inputLocation,
        creator: this.$store.state.user.displayName,
        creatorEmail: this.$store.state.user.email,
      });
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
    querySnapshot.forEach((uniqueevent) => {
      const eventData = uniqueevent.data();
      const eventObj = {
        eventID: uniqueevent.id,
        eventDate: eventData.eventDate,
        eventDetails: eventData.eventDetails,
        eventName: eventData.eventName,
        eventLocation: eventData.eventLocation,
        eventTime: eventData.eventTime,
        eventDesc: eventData.eventDesc,
        eventCreator: eventData.creator,
        creatorEmail: eventData.creatorEmail,
      };
      if (eventObj.eventCreator != this.$store.state.user.displayName) {
        console.log(eventObj.eventID);
        this.events.push(eventObj);
      }
    });
  },
};
</script>
<style></style>
