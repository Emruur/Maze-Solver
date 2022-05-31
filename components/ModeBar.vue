<script setup lang="ts">
    const props = defineProps({
        mode: Number,
        paused: Boolean
    })

    const emit = defineEmits(['change_mode','reload','pause','play'])

</script>


<template>
    <div class="top-bar">
        <div class="mode-select-bar">
            <div class="draw icon">
                <img src="~/assets/draw.png" class="img-icon" 
                    :class="{active_icon: mode==0, non_active_icon: mode!=0}" 
                    alt="toggle drawing mode"
                    @click="_ => emit('change_mode',0)">
            </div>
            <div class="erase icon">
                <img src="~/assets/eraser.png" class="img-icon" 
                :class="{active_icon: mode==1, non_active_icon: mode!=1}" 
                alt="toggle erase mode"
                @click="_ => emit('change_mode',1)">
            </div>
        </div>

        <div class="controls">
            
                <img src="~/assets/refresh.svg" class="control refresh" @click="emit('reload')" alt="">
            
                <img v-if= "!paused" src="~/assets/pause.svg" class="control pause" @click="emit('pause')" alt="">
                <img v-else src="~/assets/play.svg" class="control pause" @click="emit('play')" alt="">
        </div>
    </div>
    
</template>

<style scoped>
    .controls{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 2rem;
    }
    .control{
        margin-right: 1rem;
        width: 2rem;
        cursor: pointer;
        transition-duration: 250ms;
    }
    .refresh:hover{
        transform: rotate(90deg);
    }

    .refresh:active{
        transform: rotate(180deg);
    }

    .pause:hover{
        transform: scale(1.1);
    }
    .top-bar{
        position: absolute;
        top: 0;
        display:flex
    }
    .mode-select-bar{
        top: 0;
        background: antiquewhite;
        border: 3px solid rgb(75, 91, 121);
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
        border-top: none;
        height: 3.2rem;
        width: 8rem;

        display: flex;
        justify-content: center;
        align-items: center;
        border-top: none    
    }

    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.6rem;
        margin-right: 0.6rem;
    }

    .img-icon{
        width: 1.8rem;
        height: 1.8rem;
        padding: 0.3rem;
        transition-duration: 250ms;
    }

    .non_active_icon{
        width: 1.5rem;
        height: 1.5rem;
        cursor: pointer;
    }
    .non_active_icon:hover{
        transform:rotate(180deg) scale(1.2);
    }

    .active_icon{
        border: 3px solid rgb(75, 91, 121);
        border-radius: 0.5rem;
    }
</style>