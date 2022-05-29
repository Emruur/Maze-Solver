import {CellInterface, Coordinate} from "./publicInterfaces"
import {addCoordinates, hashedCoordinate, coordinatesEqual, outOfBounds} from "./coordinateTools"

function arrToSet(arr: Array<Coordinate>): Set<number>{
    let set: Set<number>= new Set<number>()
    arr.forEach(e => set.add(hashedCoordinate(e.x, e.y)))
    return set
}


export default function dfs(
                start:Coordinate,
                end:Coordinate, 
                mazeMatrix: Array<Array<CellInterface>>
                ):Set<number>
{ 
    let neighbours:Array<Coordinate> = [{x:-1, y:0},{x:0, y:1},{x:1,y:0},{x:0, y:-1}]

    let bound: number= mazeMatrix.length

    let pathStack:Array<Coordinate>= []
    let visitedVertices= new Set<number>()

    //Push the starting point to the stack
    pathStack.push(start)

    //Mark starting point as visited
    visitedVertices.add(hashedCoordinate(start.x, start.y))

    while(pathStack.length != 0){
        //for each neighbour to top of stack
        let top:Coordinate= pathStack[pathStack.length-1]

        if(coordinatesEqual(top,end)){
            console.log("FOUND!!!")
            return arrToSet(pathStack)
        }

        let hasNoUnvisitedNeighbours: boolean= true;

        for(let neighbour of neighbours){
            let neighbourCoordinate: Coordinate = addCoordinates(top, neighbour);
           

            if(!outOfBounds(neighbourCoordinate,bound )){

                //FIXME fix matrix access to [x][y] (transpose matrix)
                let neighbourCell:CellInterface= mazeMatrix[neighbourCoordinate.y][neighbourCoordinate.x]
         
                //If cell is active and not yet visited
                if(neighbourCell.active && !visitedVertices.has(hashedCoordinate(neighbourCoordinate.x, neighbourCoordinate.y)))
                {
                    pathStack.push(neighbourCoordinate)
                    visitedVertices.add(hashedCoordinate(neighbourCoordinate.x, neighbourCoordinate.y))
                    hasNoUnvisitedNeighbours= false;
                    break;
                }
            } 
        }
        if(hasNoUnvisitedNeighbours){
            pathStack.pop()
        }
    }

    return new Set<number>()
}

