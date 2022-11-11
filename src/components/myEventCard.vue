<template>
  <div class="col-lg-4 col-sm-12 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ name }}</h5>
        <p class="card-text">
          {{ details }}
        </p>
        <div class="d-flex justify-content-around">
          <div><i class="fa-solid fa-calendar"></i> {{ date }}</div>
          <div><i class="fa-solid fa-clock"></i> {{ time }}</div>
          <div><i class="fa-solid fa-location-dot"></i> {{ location }}</div>
        </div>
        <div class="d-grid gap-2">
          <button type="button" @click="deleteEvent(); $emit('deleteEvent', this.$.vnode.key)" class="btn btn-danger">
            Delete Event
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config";
export default {
  methods: {
    deleteEvent: async function () {
      await deleteDoc(doc(db, "events", this.$.vnode.key));
    }
    ,
  },
  props: ["name", "details", "time", "date", "location", "desc", "creator", "key"],
};
</script>
