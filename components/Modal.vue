<template>
    <button @click="openModal()" class="info-btn">
        <IconInfo />
    </button>
    <dialog class="modal" ref="modal" @click="dialogClickHandler($event)">
        
        <form method="dialog">
            <button class="close-btn">
                <IconClose />
            </button>
        </form>
        <div class="nav-buttons-cont">
            <div class="nav-buttons">

                <button @click="prev()" class="nav-button">
                    <IconPrev />
                </button>
                <div class="dots-cont">
                    <div  v-for="(dot,index) in slides" :key="index">
                        <div class="dot" :class="{active: index == currSlide}"></div>
                    </div>
                </div>
                <button @click="next()" class="nav-button">
                    <IconNext />
                </button>
            </div>
        </div>
        <div class="curr-slide" ref="slide" >
                <h1>{{ slides[currSlide].title }}</h1>
                <p>{{ slides[currSlide].description }}</p>
                <img :src="slides[currSlide].path" alt="" class="gif" ref="gif">
        </div>
        

    </dialog>
</template>

<style>
.info-btn {
    position: absolute;
    top: 15px;
    left: 15px;

    background-color: rgba(240, 248, 255, 0);
    border: none;
    opacity: 0.6;
    cursor: pointer;
    transition-duration: 200ms;
    padding: 0;
}

.info-btn:hover {
    opacity: 1;
}

.curr-slide{
    transition-duration: 200ms;
}


.modal {
    max-width: 40rem;
    background: rgb(246, 244, 229);
    padding: 1.2rem;
}

.modal>form>button {
    cursor: pointer;
    align-items: center;
    padding: 3px;
    transition-duration: 200ms;
}

.modal>form>button:hover {
    transform: scale(1.05);
}

.modal::backdrop {
    background-color: rgba(0, 0, 0, 0.556);
}

.modal>form {
    position: absolute;
    top: 5px;
    right: 5px;
}

.nav-buttons-cont {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-button {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    padding: 0;
    background-color: rgba(250, 235, 215, 0);
    border: none;
    transition-duration: 200ms;
    padding: 3px;
}

.nav-button:hover{
    transform: scale(1.2);
}


.dots-cont{
    display: inline-flex;
    align-items: center;
    justify-content: space-evenly;
    min-width: 3rem;
}

.active{
    background-color: black;
}

.nav-buttons{
    display: flex;

}

.dot{
    border:2px solid black;
    height: 10px;
    width: 10px;
    border-radius: 100%;
}


.gif {
    width: 100%;
    margin-bottom: 1rem;
}

.close-btn{
    background-color: transparent;
    border-radius: 5px;
    border: none;
    padding: 1rem;
}

</style>

<script setup lang="ts">
let modal = ref(null)
let currSlide = ref(0)
let slide= ref(null) 

let slides = ref([
    {
        title: "Hi, welcome to maze solver",
        description: "Here you can draw mazes and see to optimum path in real time.",
        path: "../assets/tut1.gif"
    },
    {
        title: "Pause & Draw",
        description: "Pause and draw the maze. Then continue solving to see how it is solved",
        path: "../assets/tut2.gif"
    },
])


function next() {
    if (currSlide.value < slides.value.length-1) {
        currSlide.value += 1;
        
    }
}
function prev() {
    if (currSlide.value > 0) {
        currSlide.value -= 1;

    }
}

function openModal() {
    modal.value.showModal()
}

function dialogClickHandler(e) {
    if (e.target.tagName !== 'DIALOG') //This prevents issues with forms
        return;

    const rect = e.target.getBoundingClientRect();

    const clickedInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
    );

    if (clickedInDialog === false)
        e.target.close();
}

onMounted(() => {
    openModal()

})
</script>