import { Coords, ShipType, Orientation } from "./types"

export class Ship {
    name: string
    ship_length: number
    
    section_coords: Coords[]
    is_sunk: boolean = false

    constructor(
        readonly first_ship_section_coord: Coords,
        readonly ship_type: ShipType,
        readonly orientation: Orientation
    ) {
        this.name = ShipType[ship_type]
        this.ship_length = ship_type

        let temp_coords: Coords[] = []

        for(let i = 0; i < this.ship_length; i++) {
            if(orientation === Orientation.Vertical) {
                temp_coords.push({
                    x: first_ship_section_coord.x, 
                    y: first_ship_section_coord.y + i
                })
            } else {
                temp_coords.push({
                    x: first_ship_section_coord.x + i, 
                    y: first_ship_section_coord.y
                })
            }
        }

        this.section_coords = temp_coords
    }
}