import * as blessed from "blessed"
import Player from "../src/models/player"
import { Color, Coordinates, Dimensions } from "../src/types"

describe("Player Class", () => {
    let player: Player
    let board_dimensions: Dimensions = { width: 16, height: 8}
    const screen = blessed.screen({})
    const parent = blessed.box({parent: screen})

    beforeEach(() => {
        player = new Player(1, Color.Blue, "USA", board_dimensions, parent)
    })

    test("should initialize Player 1 as USA with the color BLUE", () => {
        expect(player.id).toBe(1)
        expect(player.color).toBe("blue")
        expect(player.country_name).toBe("USA")
        expect(player.number_of_shots_taken).toBe(0)
        expect(player.coordinates_of_shots_taken).toHaveLength(0)
        expect(player.turn).toBeFalsy()
    })

    test("when player takes a shot log coords to shot array and increase number_of_shots_taken", () => {
        let shot1_coords:Coordinates = {x: 1, y:3}
        let shot2_coords:Coordinates = {x: 5, y:3}
        
        player.take_shot(shot1_coords)

        expect(player.number_of_shots_taken).toBe(1)
        expect(player.coordinates_of_shots_taken).toContain(shot1_coords)
        expect(player.coordinates_of_shots_taken).toHaveLength(1)

        player.take_shot(shot2_coords)

        expect(player.coordinates_of_shots_taken).toContain(shot2_coords)
        expect(player.coordinates_of_shots_taken).toHaveLength(2)
    })
})