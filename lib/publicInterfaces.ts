interface Coordinate{
    x:number,
    y:number
}

interface CellInterface{
    pos: Coordinate,
    active: boolean,
    id: number,
    onPath: boolean,
}


export {CellInterface, Coordinate};

