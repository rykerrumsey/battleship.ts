import { Coords } from "./types"

export class Player {
    id: number
    color: string
    country_name: string

    number_of_shots_taken: number = 0
    coords_of_shots_taken: Coords[] = []
    turn: boolean = false

    constructor(id: number, color: string, country_name: string) {
        this.id = id
        this.color = color
        this.country_name = country_name
    }

    take_shot(shot: Coords): void {
        this.number_of_shots_taken++
        this.coords_of_shots_taken.push(shot)
    }
}