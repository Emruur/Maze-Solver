<script setup lang="ts">
    import {ref, onMounted} from "vue"

    const emit = defineEmits(['selected'])

    const props = defineProps({
        size: Number,
        type: Boolean,
        startIndex: Number,
    })

    const slots_array= ref(new Array(props.size))

    onMounted(()=>{
        for(let i= 0; i< props.size; i++){
            slots_array.value[i]= i;
        }
    })

    function select(index){
        emit("selected",index)
    }
</script>

<template>

<div :class="{start_bar: !type, finish_bar: type}">
    <div class="slot" 
    @click="_ => select(v)"
    :class="{selected: startIndex==v ,not_selected: startIndex!=v}" 
    v-for="v of slots_array" 
    :key="v">
        <img  v-if="startIndex==v && type" src="~/assets/start.png" alt="">
        <img  v-if="startIndex==v && !type" src="~/assets/finish.png" class="start" alt="">
    </div> 
</div>    
</template>

.<style scoped>
.start_bar{
	height: 80vh;
	width: 3rem;
	background-color: rgb(197, 220, 200);
	border: 2px solid rgb(117, 117, 146);
	border-right: none;
	border-radius: 5px;

	display: flex;
	flex-direction: column;
    justify-content: space-around;
}
.finish_bar{
	height: 80vh;
	width: 3rem;
	background-color: rgb(209, 175, 167);
	border: 2px solid rgb(150, 110, 110);
	border-left: none;

	border-radius: 5px;

    display: flex;
	flex-direction: column;
    justify-content: space-around;
}

.slot{
    border: 2px dotted rgba(123, 98, 98, 0.859);
    margin: 2px;
    height: 3rem;
    border-radius: 3px;

    display: flex;
    justify-content: center;
    align-items: center;
}

.not_selected:hover{
    border: 2px solid rgba(123, 98, 98, 0.859);
}

.not_selected{
    cursor: pointer;
    transition-duration: 200ms;

}

img{
    width: 70%;
    transition-duration: 100ms;
}
.start{
    width: 80%;
}

img:hover{
    transform: scale(1.05);
}

.selected{
    border: 3px solid rgba(123, 98, 98, 0.859);
    transition-duration: 100ms;
}
</style>