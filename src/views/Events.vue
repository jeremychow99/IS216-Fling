<template>
    <Navbar />
    <div><LoadingScreen v-if="isLoading"></LoadingScreen></div>
    <div v-if="!isLoading" class="container justify-content-center">
      <div class="row">
        <div
          class="card col-sm-11 col-lg-5 mx-2 my-3"
          v-for="event of displayEvents"
        >
          <div class="card-body">
            <div class="row">
                <div class="col-4">
                    <h5 class="card-title">{{ event.eventName }}</h5>
                </div>
                <div class="col-4"></div>
                <div class="col-4">
                    <p>{{event.eventCreator}}</p>
                </div>
            </div>

            <h6 class="card-subtitle mb-2 text-muted">Created: {{ event.eventCreatedate }}</h6>
            <p class="card-text">
              {{ event.eventDetails }}
            </p>
            <div class="row">
              <div class="col-4">
                <i class="fa-solid fa-calendar"></i> {{ event.eventDate }}
              </div>
              <div class="col-4"></div>
              <div class="col-4">
                <i class="fa-solid fa-location-dot"></i> {{event.eventLocation}}
              </div>
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="button">
                Click to open MODAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "../config";
  import { getDocs, collection } from "firebase/firestore";
  
  import EventCard from "../components/eventcard.vue";
  import Navbar from "../components/Navbar.vue";
  import LoadingScreen from "../components/loading.vue";
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
      };
    },
    computed: {
      displayEvents() {
        return this.events;
      },
    },
    async mounted() {
      setTimeout(() => {
        this.isLoading = false;
        console.log('hello')
      }, 1500);
      
      const querySnapshot = await getDocs(collection(db, "events"));
      querySnapshot.forEach((event) => {
        const eventData = event.data();
        const eventObj = {
          eventDate: eventData.eventDate,
          eventDetails: eventData.eventDetails,
          eventName: eventData.eventName,
          eventLocation: eventData.eventLocation,
          eventTime: eventData.eventTime,
          eventCreator: eventData.creator,
          eventCreatedate: eventData.eventCreatedate

        };
        this.events.push(eventObj);
      });
    },
  };
  </script>
  