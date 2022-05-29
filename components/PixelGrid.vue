<script setup lang="ts">
    import { ref, onMounted,computed } from 'vue'
    import {hashedCoordinate} from "../lib/coordinateTools"
    import {CellInterface, Coordinate} from "../lib/publicInterfaces"
    import dfs from "../lib/depthFirstSearch"
    import aStartSearch from "../lib/aStarSearch"


    const props = defineProps({
        size: Number,
        mazeStartIndex: Number,
        mazeEndIndex: Number,
        drawing_mode: Number,
        reloading: Boolean,
        paused: Boolean
    })

    const emit = defineEmits(['doneReloading'])



    function copyCell(a: CellInterface): CellInterface{
        return {
            pos:{x:a.pos.x, y: a.pos.y},
            active: a.active,
            id: a.id,
            onPath: a.onPath,
        }
    }
    
    const cellMatrix= ref(Array<Array<CellInterface>>())

    const pathDFS= ref(new Set<number>())

    watch([cellMatrix,props],
        ([cellMatrix,props], [prevCellMatrix, prevProps])=>{
            let mazeStart: Coordinate = {x:-1, y:props.mazeStartIndex}
            let mazeEnd: Coordinate = {x: props.size-1, y: props.mazeEndIndex}

            let path= new Set<number>()
            if(!props.paused){
                path= aStartSearch(mazeStart, mazeEnd, cellMatrix)
            }
            pathDFS.value= path
        },
    {deep: true}
    )

    function init(){
        cellMatrix.value= Array<Array<CellInterface>>()

        let count= 0;
        for(let i:number= 0; i< props.size; i++){
            let row= []
            for(let j: number= 0; j<props.size; j++){
                row.push({
                    pos: {x: i, y:j},
                    active: true,
                    id: count++,
                    onPath: false,
                })
            }
            cellMatrix.value.push(row);
        }
    }

    onUpdated(()=>{
        if(props.reloading){
            init()
            emit("doneReloading")
            console.log("reloading")
        }
    })

    onMounted(() => {
        init()
    })

    const cells = computed(()=>{

        let cellArray= []
        for(let row of cellMatrix.value){
            for(let e of row){
                let element= copyCell(e)
                if(pathDFS.value.has(hashedCoordinate(element.pos.y, element.pos.x))){
                    element.onPath= true
                }
                cellArray.push(element);
            }
        }
        return cellArray;
    })

    function deActivateCell(x:number,y:number){
        cellMatrix.value[x][y].active= false;
    }
    function activateCell(x:number,y:number){
        cellMatrix.value[x][y].active= true;
    }

    //mouse drag state
    const mouseDown= ref(false);

    function mousePresed(){
        mouseDown.value= true;
    }

    function mouseReleased(){
        mouseDown.value= false;
    }

</script>

<template>
    <div class="container" 
    v-on:mousedown.prevent="mousePresed" 
    v-on:mouseup="mouseReleased" 
    v-on:mouseleave="mouseReleased"
    >
        <Cell v-for="c in cells" 
        :key="c.id" 
        :isOnPath="c.onPath" 
        :isActive="c.active" 
        :selectable="mouseDown"
        :mode="drawing_mode"
        @selected="()=>deActivateCell(c.pos.x, c.pos.y)" @deselected="activateCell(c.pos.x, c.pos.y)"/>
    </div>
</template>

<style scoped>
    .container{
        box-sizing: border-box;
        background-color: rgb(105, 101, 139);
        height: 100%;
        width: 100%;
        border-radius: 4px;
        padding: 4px;

        display: grid;
        grid-template-columns: repeat(20,auto);
        gap: 4px;
    }

    
</style>