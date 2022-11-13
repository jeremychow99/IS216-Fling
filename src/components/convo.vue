<template>
    <router-link class="list-group-item d-flex justify-content-between py-3 chat"  :to="{ name: 'Chatroom', params: { id: this.$.vnode.key }}">
        <div class="d-flex flex-row">
            <img src="https://firebasestorage.googleapis.com/v0/b/is216-proj-v1.appspot.com/o/images%2Fuser.png?alt=media&token=e5307efb-4818-4724-8da6-58113c302507" alt="" width="60" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong">
            <div class="pt-1">
                <p class="fw-bold mb-0">{{ user }}</p>
            </div>
        </div>
        <div class="pt-1">
            <p class="small text-muted mb-1">{{ dateTime }}</p>
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['user', 'lastmsgtime'],
    computed: {
        dateTime() {
            var date = new Date(this.lastmsgtime);
            let date_str = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            return date_str;
        }
    }
}
</script>

<style>
.chat:hover {
    background-color: lightblue;
}
</style>