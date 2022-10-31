<template>
    <router-link class="list-group-item" :to="{ name: 'Chatroom', params: { id: 'test'}}">
        <div>
            <!-- Follow tele layout? -->
            <!-- Profile Image -->
            <!-- Name -->
            <!-- Last convo time? -->
            {{ userObj }}

            {{ lastmsgtime }}
        </div>
    </router-link>
</template>

<script>
export default {
    props: ['userObj', 'lastmsgtime'],
}
</script>