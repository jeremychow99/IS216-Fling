<template>
    <router-link class="list-group-item" :to="{ name: 'Chatroom', params: { id: this.$.vnode.key}}">
        <div>
            <!-- Follow tele layout? -->
            <!-- Profile Image -->
            <!-- Name -->
            <!-- Last convo time? -->
            {{ user }}

            {{ lastmsgtime }}
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['user', 'lastmsgtime'],
}
</script>