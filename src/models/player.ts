import * as blessed from "blessed"
import { Color, Coordinates, Dimensions } from "../types"
import Board from "./board"

export default class Player {
    number_of_shots_taken: number = 0
    coordinates_of_shots_taken: Coordinates[] = []
    turn: boolean = false
    //board: Board 

    constructor(
        readonly id: number, 
        readonly color: Color, 
        readonly country_name: string,
        readonly board_dimensions: Dimensions,
        //readonly game_screen: blessed.Widgets.BoxElement
    ) {
        //this.board = new Board(this.color, this.board_dimensions, this.game_screen)
    }

    show_picker(screen: blessed.Widgets.Screen) {
        // this.board.position_coordinate = {x: "center", y: "center"}
        // this.board.place_ship(screen)
    }


    take_shot(shot: Coordinates): void {
        this.number_of_shots_taken++
        this.coordinates_of_shots_taken.push(shot)
    }
}