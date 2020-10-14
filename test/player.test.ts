import { Player } from "../src/player"
import { expect } from "chai"

describe("Player", () => {
    it("should initialize player with default values", () => {
       let player = new Player()
       expect(player.value).to.equal(0) 
    })
})