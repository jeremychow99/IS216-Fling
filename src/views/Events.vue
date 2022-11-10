<template>
  <!-- main right side -->
  <!-- <div class="col-10 col-sm-10 col-lg-10">
        <div class="row align-items-center mt-3">
            <div class="col">
                <strong class="fs-4">Events</strong>
            </div>
        </div>
        <div class="row align-items-center mt-3">
            <form class="form-inline">
                <input class="form-control mr-sm-2" type="search" placeholder="Search for People/Events" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        <div class="row align-items-center mt-3">

            <div class="col-12 col-md-6 col-lg-4 col-xl-4 mt-3 me-3">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="https://placekitten.com/100/70/" alt="Image of event" id="event_pic">
                    <div class="card-body">
                        <h5 class="card-title" id="event_name">Recruiting for Tic Tac Toe Hackathon</h5>
                        <p class="card-text" id="lister_name">Tan Ah Meng</p>
                        <p class="card-text" id="event_details">Looking for 1 more person to join our team. More details...</p>
                        <p class="card-text" id="event_date">Listed on 10/10/2022</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 col-xl-4 mt-3 me-3">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="https://placekitten.com/100/70/" alt="Image of event" id="event_pic2">
                    <div class="card-body">
                        <h5 class="card-title" id="event_name2">Recruiting for Toe Tac Tic Hackathon</h5>
                        <p class="card-text" id="lister_name2">Tan Ah Chew</p>
                        <p class="card-text" id="event_details2">Looking for 3 more people to join our team. More details...</p>
                        <p class="card-text" id="event_date2">Listed on 20/10/2022</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4 col-xl-4 mt-3 me-3">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="https://placekitten.com/100/70/" alt="Image of event" id="event_pic2">
                    <div class="card-body">
                        <h5 class="card-title" id="event_name2">Recruiting for Shopee Internship</h5>
                        <p class="card-text" id="lister_name2">John Lee</p>
                        <p class="card-text" id="event_details2">Looking for 3 more people to join our team. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus corrupti quaerat eligendi sint. Mollitia, id repellat. Molestias, dolore. Suscipit nulla architecto aspernatur beatae odio adipisci provident. At ullam iste quam!</p>
                        <p class="card-text" id="event_date2">Listed on 17/10/2022</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

        </div>
    </div> -->
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
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((event) => {
        const eventData = event.data()
        const eventObj = {
            
        }
    })
  }
};
</script>
