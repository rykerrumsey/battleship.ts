import { Ship } from "../src/ship"
import { Coords, Orientation, ShipType } from "../src/types"


describe("Ship Class", () => {
    let ship1: Ship
    let ship2: Ship
    
    let ship1_first_section_coord: Coords = {x: 4, y: 2}
    let ship2_first_section_coord: Coords = {x: 2, y: 7}

    beforeEach(() => {
        ship1 = new Ship(ship1_first_section_coord, ShipType.Carrier, Orientation.Vertical)
        ship2 = new Ship(ship2_first_section_coord, ShipType.Cruiser, Orientation.Horizontal)
    })

    test("should create a Carrier with a length of 5 and contain all ship portion coords", () => {
        expect(ship1.name).toBe("Carrier")
        expect(ship1.ship_length).toBe(5)
        expect(ship1.is_sunk).toBeFalsy()
        
        expect(ship1.section_coords).toEqual(expect.arrayContaining(
            [
                {x: 4, y: 2},
                {x: 4, y: 3},
                {x: 4, y: 4},
                {x: 4, y: 5},
                {x: 4, y: 6}
            ]
        ))
    })

    test("should create a Cruiser with a length of 3 and contain all ship portion coords", () => {
        expect(ship2.name).toBe("Cruiser")
        expect(ship2.ship_length).toBe(3)
        expect(ship2.is_sunk).toBeFalsy()
        
        expect(ship2.section_coords).toEqual(expect.arrayContaining(
            [
                {x: 2, y: 7},
                {x: 3, y: 7},
                {x: 4, y: 7}
            ]
        ))
    })
})