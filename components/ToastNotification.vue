<script setup lang="ts">
    import {defineProps} from "vue"

    const props= defineProps({
        type: String
    })
</script>

<template>
    <div class="toast" :class="{
        alert: type === 'alert',
        info:  type === 'info'
    }">
       <slot></slot> 
    </div>
</template>

<style>
    .toast{
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        bottom: -3rem;
        width: 14rem;
        border-radius: 0.7rem;
        padding: 0.3rem;
        text-align: center;
        border: 3px solid rgba(123, 98, 98, 0.859);
    }

    .alert{
        background-color: rgb(209, 175, 167);
    }

    .info{
        background-color: antiquewhite
    }
</style>

