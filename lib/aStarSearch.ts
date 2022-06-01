import { addCoordinates, coordinatesEqual, hashCoordinate, outOfBounds } from "./coordinateTools";
import { generateBinaryMatrix } from "./mazeTools";
import { CellInterface, Coordinate } from "./publicInterfaces";

class Node{
    parent: Coordinate
    pos: Coordinate
    g:number
    h:number
    f:number

    constructor(pos:Coordinate){
        this.pos= pos
        this.parent= null
        this.g= 0
        this.h= 0
        this.f= 0
    }
}

function traversable(a: Coordinate, matrix: Array<Array<boolean>>): boolean{
    let size= matrix.length

    if(outOfBounds(a,size))
        return false
    
    if(getValue(a,matrix))
        return true

    return false
}

function backtrackRoute(nodes:Map<number,Node> ,end:Coordinate): Set<number>{
    let pathSet= new Set<number>()

    //get end node from map
    let curr:Node= nodes.get(hashCoordinate(end)) 

    while(curr.parent != null){
        pathSet.add(hashCoordinate(curr.pos))
        curr= nodes.get(hashCoordinate(curr.parent))
    }

    return pathSet
}

function calculateDistance(a: Coordinate, b:Coordinate): number{
    return Math.sqrt( ((a.x-b.x)**2) + ((a.y-b.y)**2) )
}

function getMinimumCostNode(map: Map<number, Node>): Node{
    let first= true
    let min: Node
    map.forEach((node:Node,key:number)=>{
        if(first) {
            min= node
            first= false
        }
        else{
            if(node.f< min.f)
                min= node
        }
    })

    return min
}

function getValue(a:Coordinate, matrix: Array<Array<boolean>>)
:boolean
{
    return matrix[a.y][a.x]
}

export default function aStarSearch(
    start: Coordinate,
    end: Coordinate,
    maze: Array<Array<CellInterface>>
): Set<number>
{
    let neighbours:Array<Coordinate> = [{x:-1, y:0},{x:0, y:1},{x:1,y:0},
                                        {x:0, y:-1}]

    let path = new Set<number>()
    let binaryMatrix= generateBinaryMatrix(maze)

    let open= new Map<number, Node>()
    let closed= new Map<number, Node>()

        //START ALGORITHM

    //add start node to open
    let startNode= new Node(start)
    open.set(hashCoordinate(start),startNode)

    while(open.size > 0){
        let current= getMinimumCostNode(open)

        open.delete(hashCoordinate(current.pos))
        closed.set(hashCoordinate(current.pos),current)

        //if current is the target node
        if(coordinatesEqual(current.pos, end))
            return backtrackRoute(closed, end)

        //keep searching
        for(let n of neighbours){
            let neighbourCoordinate: Coordinate= addCoordinates(n, current.pos)

            //if neighbour is traversable and is not in closed
            if(traversable(neighbourCoordinate,binaryMatrix)
                && !closed.has(hashCoordinate(neighbourCoordinate)))
            {
                //if path to neighbour is not opened yet
                if(!open.has(hashCoordinate(neighbourCoordinate))){
                    //create new node 
                    let neighbourNode= new Node(neighbourCoordinate)

                    //set f g h costs to neighbour
                    //TODO calculateDistance(current.pos, neighbourNode.pos)is probably always 1
                    neighbourNode.g= calculateDistance(current.pos, neighbourCoordinate) + current.g
                    neighbourNode.h= calculateDistance(end, neighbourCoordinate)
                    neighbourNode.f= neighbourNode.g + neighbourNode.h

                    //set its parent to current node
                    neighbourNode.parent= current.pos

                    open.set(hashCoordinate(neighbourCoordinate), neighbourNode)
                }
                //open set has the neighbour node
                else{
                    let neighbourNode= open.get(hashCoordinate(neighbourCoordinate))
                    //if new path to neighbour is shorter than the path
                    //TODO calculateDistance(current.pos, neighbourNode.pos)is probably always 1
                    let newPath= current.g + calculateDistance(current.pos, neighbourNode.pos)
                    if(neighbourNode.g > newPath){
                        neighbourNode.g= newPath
                        //update f cost of neighbour node
                        neighbourNode.f= neighbourNode.g + neighbourNode.h
                        //set its parent to current pos
                        neighbourNode.parent= current.pos
                        open.set(hashCoordinate(neighbourCoordinate), neighbourNode)
                    }
                }
            }
        }
    }
    return new Set<number>()
}