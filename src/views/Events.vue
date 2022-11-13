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
        v-for="event of displayEvents"
        :key="event.eventID"
        :name="event.eventName"
        :details="event.eventDetails"
        :time="event.eventTime"
        :date="event.eventDate"
        :location="event.eventLocation"
        :desc="event.eventDesc"
        :creator="event.eventCreator"
        :creatorEmail="event.creatorEmail"
      >
      </EventCard>
    </div>
  </div>

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Event</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Event Name</span>
            <input
              v-model="inputName"
              type="text"
              class="form-control"
              aria-label="eventname"
              aria-describedby="basic-addon1"
            />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"
              >Event Location</span
            >
            <input
              v-model="inputLocation"
              type="text"
              class="form-control"
              aria-label="eventname"
              aria-describedby="basic-addon1"
            />
          </div>

          <label for="basic-url" class="form-label"></label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon3">Description</span>
            <textarea
              v-model="inputDetails"
              maxlength="100"
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="100 Character Limit"
            />
          </div>
          <div class="input-group mb-3" id="inputGroupPrepend">
            <span class="input-group-text">Date</span>
            <input
              v-model="inputDate"
              type="date"
              class="form-control"
              aria-label="date"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Time</span>
            <input
              v-model="inputTime"
              type="time"
              class="form-control"
              aria-label="time"
            />
          </div>

          <div class="input-group">
            <span class="input-group-text">Details</span>
            <textarea
              v-model="inputDesc"
              class="form-control"
              aria-label="With textarea"
              placeholder="500 Character Limit"
              maxlength="500"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-primary"
            @click="addEvent"
          >
            Add Event
          </button>
        </div>
      </div>
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
        creatorEmail: eventData.creatorEmail,
      };
      if (eventObj.eventCreator != this.$store.state.user.displayName) {
        console.log(eventObj);
        this.events.push(eventObj);
      }
    });
  },
};
</script>
<style></style>
