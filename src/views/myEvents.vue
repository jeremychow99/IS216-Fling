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
          style="float: right"
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
    <div v-if="this.events.length == 0">
      <h1 class="display-2 text-center">You have not created any events!</h1>
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

          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon3">Description <br>({{inputDetails.length}}/100)</span>
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
            <span class="input-group-text">Details <br>({{inputDesc.length}}/500)</span>
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
import { getDocs, collection, addDoc, deleteDoc } from "firebase/firestore";
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
    addEvent: async function () {
      // console.log(this.inputTime)
      // console.log(this.inputDate)
      // console.log(typeof this.inputTime)
      // console.log(typeof this.inputDate)
      const docRef = await addDoc(collection(db, "events"), {
        eventName: this.inputName,
        eventDate: this.inputDate,
        eventTime: this.inputTime,
        eventDesc: this.inputDesc,
        eventDetails: this.inputDetails,
        eventLocation: this.inputLocation,
        creator: this.$store.state.user.displayName,
        creatorEmail: this.$store.state.user.email,
      });
      const addedObj = {
        eventID: docRef.id,
        eventDate: this.inputDate,
        eventDetails: this.inputDetails,
        eventName: this.inputName,
        eventLocation: this.inputLocation,
        eventTime: this.inputTime,
        eventDesc: this.inputDesc,
        eventCreator: this.$store.state.user.displayName,
      };
      console.log(docRef.id)
      this.events.push(addedObj);
      this.inputName = ""
      this.inputDate = ""
      this.inputTime = ""
      this.inputDesc = ""
      this.inputDetails = ""
      this.inputLocation = ""
    },
    deleteEvent: function (s) {
      console.log(s);
      setTimeout(() => {
        for (let index = 0; index < this.events.length; index++) {
          if (this.events[index].eventID == s) {
            this.events.splice(index, 1);
          }
        }
      }, 1200);
      //   for (let index = 0; index < this.events.length; index++) {
      //   if (this.events[index].eventID == s) {
      //     this.events.splice(index, 1);
      //   }
      // }
      // for (let index = 0; index < this.events.length; index++) {
      //   if (this.events[index].eventID == s) {
      //     this.events.splice(index, 1);
      //   }
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
      console.log(this.events);
    });
  },
};
</script>
