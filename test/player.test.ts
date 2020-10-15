import { Player } from "../src/player"
import { Coords } from "../src/types"

describe("Player Class", () => {
    let player: Player

    beforeEach(() => {
        player = new Player(1, "BLUE", "USA")
    })

    test("should initialize player 1 as USA", () => {
        expect(player.id).toBe(1)
        expect(player.color).toBe("BLUE")
        expect(player.country_name).toBe("USA")
        expect(player.number_of_shots_taken).toBe(0)
        expect(player.coords_of_shots_taken).toHaveLength(0)
        expect(player.turn).toBeFalsy()
    })

    test("when player takes a shot log coords to shot array and increase number_of_shots_taken", () => {
        let shot1_coords:Coords = {x: 1, y:3}
        let shot2_coords:Coords = {x: 5, y:3}
        
        player.take_shot(shot1_coords)

        expect(player.number_of_shots_taken).toBe(1)
        expect(player.coords_of_shots_taken).toContain(shot1_coords)
        expect(player.coords_of_shots_taken).toHaveLength(1)

        player.take_shot(shot2_coords)

        expect(player.coords_of_shots_taken).toContain(shot2_coords)
        expect(player.coords_of_shots_taken).toHaveLength(2)
    })
})