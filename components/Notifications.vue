<script setup lang="ts">
    import { defineProps } from 'vue';

    const props= defineProps({
        paused: Boolean,
        no_path: Boolean
    })
</script>

<template>
   <Transition name="toast">
        <ToastNotification :type="'info'" v-if="paused">
            Path finding is paused...
        </ToastNotification>
        <ToastNotification :type="'alert'" v-else-if="no_path">
            No path found!
        </ToastNotification>

    </Transition>  
</template>

<style>
.toast-enter-from{
    opacity: 0;
    transform: translateY(2rem);
}

.toast-enter-active{
    transition: all 0.6s ease
}

.toast-leave-to{
    opacity: 0;
    transform: translateY(2rem);
}

.toast-leave-active{
    transition: all 0.3s ease
}

</style>