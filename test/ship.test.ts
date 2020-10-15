import { Ship } from "../src/ship"
import { Coords, Orientation, ShipType } from "../src/types"


describe("Ship Class", () => {
    let ship1: Ship
    let ship2: Ship
    
    let ship1_coords: Coords = {x: 4, y: 2}
    let ship2_coords: Coords = {x: 2, y: 7}

    beforeEach(() => {
        ship1 = new Ship(ship1_coords, ShipType.Carrier, Orientation.Vertical)
        ship2 = new Ship(ship2_coords, ShipType.Cruiser, Orientation.Horizontal)
    })

    test("should create a Carrier with a length of 5 and contain all ship portion coords", () => {
        expect(ship1.name).toBe("Carrier")
        expect(ship1.length).toBe(5)
        expect(ship1.is_sunk).toBeFalsy()
        
        expect(ship1.section_coords).toContain({x: 4, y: 2})
        expect(ship1.section_coords).toContain({x: 4, y: 3})
        expect(ship1.section_coords).toContain({x: 4, y: 4})
        expect(ship1.section_coords).toContain({x: 4, y: 5})
        expect(ship1.section_coords).toContain({x: 4, y: 6})
    })

    test("should create a Cruiser with a length of 3 and contain all ship portion coords", () => {
        expect(ship2.name).toBe("Cruiser")
        expect(ship2.length).toBe(3)
        expect(ship2.is_sunk).toBeFalsy()
        
        expect(ship2.section_coords).toContain({x: 2, y: 7})
        expect(ship2.section_coords).toContain({x: 3, y: 7})
        expect(ship2.section_coords).toContain({x: 4, y: 7})
    })
})