import * as blessed from "blessed"
import { Color, Coordinates, Dimensions } from "../types"
import Board from "./board"

export default class Player {
    number_of_shots_taken: number = 0
    coordinates_of_shots_taken: Coordinates[] = []
    turn: boolean = false
    board: Board = new Board(this.color, this.board_dimensions)

    constructor(
        readonly id: number, 
        readonly color: Color, 
        readonly country_name: string,
        readonly board_dimensions: Dimensions,
    ) {
    }

    take_shot(shot: Coordinates): void {
        this.number_of_shots_taken++
        this.coordinates_of_shots_taken.push(shot)
    }
}