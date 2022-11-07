<template>
    <div class="message mt-1">
        <span v-if="!sender">{{ senderName }}</span>
        <div class="d-flex" :class="sender ? 'flex-row-reverse' : 'flex-row'">
            <div class="rounded-2 bg-secondary text-white px-3 py-2" style="max-width: 60vw; overflow-wrap: break-word;">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['senderName', 'sender'],
}
</script>
