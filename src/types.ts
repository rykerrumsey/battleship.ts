export enum Color {
    Blue = "blue",
    Red = "red",
    White = "white",
    Black = "black"
}

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

export interface Coordinates {
    x: number | string, 
    y: number | string
}

export interface Dimensions {
    width: number,
    height: number
}

export interface Shot {
    position: Coordinates,
    hit: boolean
}