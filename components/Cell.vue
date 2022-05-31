
<script setup lang="ts">
    import {ref} from "vue"
    const props = defineProps({
        isActive: Boolean,
        selectable: Boolean,
        isOnPath: Boolean,
        mode: Number
    })
    const emit = defineEmits(['selected','deselected'])

    function selectOnHover(){
        if(props.selectable){
            emit("selected")
        }
    }
    function selectOnClick(){
        emit("selected")
    }
    function deSelectOnHover(){
        if(props.selectable){
            emit("deselected")
        }
    }
    function deSelectOnClick(){
        emit("deselected")
    }
</script>

<template>  
    <div v-if="isActive && mode != 0" class="active-cell" :class="{path_cell: isOnPath}" >
    </div>

    <div v-else-if="isActive && mode == 0" class="active-cell draw_mode" :class="{path_cell: isOnPath}" 
        v-on:mouseover="selectOnHover" 
        v-on:mousedown="selectOnClick">
    </div>

    <div v-else-if="mode!=1" class="cell" ></div>

    <div v-else-if="mode==1" class="cell erase_mode"  
        v-on:mouseover="deSelectOnHover" 
        v-on:mousedown="deSelectOnClick"
    ></div>
</template>

<style scoped>
.erase_mode{
    cursor: pointer;
    transition-duration: 150ms;
}
.draw_mode{
    cursor: cell;
    transition-duration: 150ms;
}


@media (hover: hover) {
    .draw_mode:hover{
        border-radius: 5px;
        background: rgb(246, 168, 66);
    }
    .erase_mode:hover{
        background: antiquewhite;
    }
}

.active-cell{
    border-radius: 2px;
    background-color: antiquewhite;
}

.cell{
    background-color: rgb(246, 168, 66);
    border-radius: 5px;
    transform: scale(1.02);
}

.path_cell{
    background-color: rgb(48, 62, 90);
    transform: scale(0.8); 
}

</style>