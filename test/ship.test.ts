import Ship from "../src/ship"
import { Coordinates, Orientation, ShipType } from "../src/types"


describe("Ship Class", () => {
    let ship1: Ship
    let ship2: Ship
    
    beforeEach(() => {
        ship1 = new Ship(ShipType.Carrier)
        ship2 = new Ship(ShipType.Cruiser)
        ship1.toggle_orientation()
    })

    test("should create a Carrier with a length of 5 and contain all ship portion coords", () => {
        expect(ship1.name).toBe("Carrier")
        expect(ship1.ship_type).toBe(5)
        expect(ship1.is_sunk).toBeFalsy()
    })

    test("should create a Cruiser with a length of 3 and contain all ship portion coords", () => {
        expect(ship2.name).toBe("Cruiser")
        expect(ship2.ship_type).toBe(3)
        expect(ship2.is_sunk).toBeFalsy()
    })

    test("calculate ship section coordinates based off of lead ship coordinate", () => {
        const ship1_lead_section_coord: Coordinates = {x: 4, y: 2}
        const ship2_lead_section_coord: Coordinates = {x: 2, y: 7}
    
        const result1 = ship1.calculate_ship_section_coordinates(ship1_lead_section_coord)
        const result2 = ship2.calculate_ship_section_coordinates(ship2_lead_section_coord)

        expect(result1).toEqual(expect.arrayContaining(
            [
                {x: 4, y: 2},
                {x: 4, y: 3},
                {x: 4, y: 4},
                {x: 4, y: 5},
                {x: 4, y: 6}
            ]
        ))

        expect(result2).toEqual(expect.arrayContaining(
            [
                {x: 2, y: 7},
                {x: 3, y: 7},
                {x: 4, y: 7}
            ]
        ))
    })
})