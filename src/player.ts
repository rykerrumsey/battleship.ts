import { Coordinates } from "./types"

export class Player {
    number_of_shots_taken: number = 0
    coordinates_of_shots_taken: Coordinates[] = []
    turn: boolean = false

    constructor(
        readonly id: number, 
        readonly color: string, 
        readonly country_name: string
    ) {}

    take_shot(shot: Coordinates): void {
        this.number_of_shots_taken++
        this.coordinates_of_shots_taken.push(shot)
    }
}