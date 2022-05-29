import { Coordinate } from "./publicInterfaces"

export function coordinatesEqual(a:Coordinate, b:Coordinate): boolean{
    return a.x==b.x && a.y==b.y
}

export function addCoordinates(a:Coordinate, b: Coordinate): Coordinate{
    return {x: a.x + b.x, y:a.y + b.y}
}

export function outOfBounds(c: Coordinate, bound: number):boolean{
    if(c.x<0 || c.x >= bound){
        return true
    }
    else if(c.y<0 || c.y>= bound){
        return true
    }
    return false
}

export function hashedCoordinate(x:number, y:number): number{
    // Enter Szudzik's function to map two integers to a unique integer determenistically:
    return x >= y ? x * x + x + y : x + y * y;
}
export function hashCoordinate(a:Coordinate): number{
    // Enter Szudzik's function to map two integers to a unique integer determenistically:
    let x= a.x
    let y= a.y
    return x >= y ? x * x + x + y : x + y * y;
}


