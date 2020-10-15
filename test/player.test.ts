import { Player } from "../src/player"

test("should initialize player with default values", () => {
    let player = new Player(1)
    expect(player.playerNumber).toBe(1)
})