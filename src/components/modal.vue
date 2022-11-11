<template>
  <!-- Modal -->
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
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            {{ event.eventName }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ event.eventDesc }}</div>
        <div class="d-flex justify-content-around">
          <div><i class="fa-solid fa-calendar"></i> {{ event.eventDate }}</div>
          <div><i class="fa-solid fa-calendar"></i> {{ event.eventTime }}</div>
          <div>
            <i class="fa-solid fa-calendar"></i> {{ event.eventLocation }}
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
          <button type="button" class="btn btn-primary">Message Person</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
    },
  },
};
</script>
