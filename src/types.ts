export enum Orientation {
    Vertical,
    Horizontal
}

export enum ShipType {
    Carrier = 5,
    Battleship = 4,
    Submarine = 3,
    Cruiser = 3,
    Destroyer = 2
}

export interface Coords {
    x: number, 
    y: number
}

export interface Shot {
    position: Coords,
    hit: boolean
}