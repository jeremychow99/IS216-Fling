<template>
  <div class="col-lg-4 col-sm-12 my-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ date }}</h6>
        <p class="card-text">
          {{ details }}
        </p>
        <div class="d-flex justify-content-around">
          <div><i class="fa-solid fa-calendar"></i> {{ date }}</div>
          <div><i class="fa-solid fa-clock"></i> {{ time }}</div>
          <div><i class="fa-solid fa-location-dot"></i> {{ location }}</div>
        </div>
        <div class="d-grid gap-2">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            :data-bs-target="'#exampleModal' + name"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      :id="'exampleModal' + name"
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
          <div class="modal-body"></div>
          <div>{{details}}</div>
          <div class="my-2">{{desc}}</div>
          
          <div class="d-flex justify-content-around my-2">
            <div><i class="fa-solid fa-calendar"></i> {{ date }}</div>
            <div><i class="fa-solid fa-clock"></i> {{ time }}</div>
            <div>
              <i class="fa-solid fa-location-dot"></i>
               {{ location }}
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >Close</button>
            <button type="button" class="btn btn-primary">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ["name", "details", "time", "date", "location", "desc"],
  methods: {},
};
</script>
