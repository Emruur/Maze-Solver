
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
        if(props.selectable && props.mode==0){
            emit("selected")
        }
    }
    function selectOnClick(){
        if(props.mode==0)
            emit("selected")
    }
    function deSelectOnHover(){
        if(props.selectable && props.mode==1){
            emit("deselected")
        }
    }
    function deSelectOnClick(){
        if(props.mode==1)
            emit("deselected")
    }
</script>

<template>  
    <div class="active-cell" v-if="isActive" :class="{path_cell: isOnPath, draw_mode: mode==0}" 
        v-on:mouseover="selectOnHover" 
        v-on:mousedown="selectOnClick">
    </div>

    <div v-else class="cell" :class="{erase_mode: mode==1}"  
        v-on:mouseover="deSelectOnHover" 
        v-on:mousedown="deSelectOnClick"
    ></div>
</template>

<style scoped>
.cell{
    background-color: rgb(246, 168, 66);
    border-radius: 5px;
    transform: scale(1.02);
}

.erase_mode{
    cursor: pointer;
    transition-duration: 150ms;
}
.draw_mode{
    cursor: cell;
    transition-duration: 150ms;
}
.active-cell{
    border-radius: 2px;
    background-color: antiquewhite;
}

.draw_mode:hover{
    border-radius: 5px;
    background-color: rgb(246, 168, 66);
}

.erase_mode:hover{
    background-color: antiquewhite;
}

.path_cell{
    background-color: rgb(48, 62, 90);
    transform: scale(0.8); 
}

</style>