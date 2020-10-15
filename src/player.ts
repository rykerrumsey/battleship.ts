import { Coords } from "./types"

export class Player {
    number_of_shots_taken: number = 0
    coords_of_shots_taken: Coords[] = []
    turn: boolean = false

    constructor(
        readonly id: number, 
        readonly color: string, 
        readonly country_name: string
    ) {}

    take_shot(shot: Coords): void {
        this.number_of_shots_taken++
        this.coords_of_shots_taken.push(shot)
    }
}