import {CellInterface, Coordinate} from "./publicInterfaces"

export function generateBinaryMatrix(cellMatrix: Array<Array<CellInterface>>): Array<Array<boolean>>{
    let size= cellMatrix.length

    //Initialize matrix to all zeros
    let binMatrix= Array<Array<boolean>>()

    for(let i= 0; i<size; i++){
        let row:Array<boolean>= []
        for(let j= 0; j<size; j++){
            row.push(cellMatrix[i][j].active ? true: false)
        }
        binMatrix.push(row)
    }
    return binMatrix
}