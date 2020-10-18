import * as blessed from "blessed"
import { Coordinates, ShipType, Orientation, Dimensions } from "./types"

export default class Ship {
    name: string
    _ship_dimensions: Dimensions 

    _orientation: Orientation = Orientation.Horizontal
    is_sunk: boolean = false

    constructor(
        readonly ship_type: ShipType,
    ) {
        this.name = ShipType[ship_type]        

        if(this._orientation === Orientation.Horizontal)
            this._ship_dimensions = { width: ship_type, height: 1 }
        else
            this._ship_dimensions = { width: 1, height: ship_type}
   }

    calculate_ship_section_coordinates(ship_coordinate: Coordinates): Coordinates[] {

        let ship_section_coordinates: Coordinates[] = []

        for(let i = 0; i < this.ship_type; ++i) {
            if(this._orientation === Orientation.Vertical) {
                ship_section_coordinates.push({
                    x: ship_coordinate.x, 
                    y: Number(ship_coordinate.y) + i
                })
            } else {
                ship_section_coordinates.push({
                    x: Number(ship_coordinate.x) + i, 
                    y: ship_coordinate.y
                })
            }
        }

        return ship_section_coordinates 
    }

    toggle_orientation(): void {
            switch(this._orientation) {
                case Orientation.Vertical:
                    this._orientation = Orientation.Horizontal
                    break
                case Orientation.Horizontal:
                    this._orientation = Orientation.Vertical
                    break
                default:
                    return
            }
    }

    draw(mouse: Coordinates, board_position: Coordinates, board_dimensions: Dimensions): blessed.Widgets.BoxElement {
        let top = Number(mouse.y) - Number(board_position.y)
        let left = Number(mouse.x) - Number(board_position.x)

        if(this._orientation === Orientation.Horizontal) {
            if(mouse.x >= Number(board_position.x) + Number(board_dimensions.width) - this.ship_type - 1) {
                left = Number(board_dimensions.width - this.ship_type)
            } 
        } else {
            if(mouse.y >= Number(board_position.y) + Number(board_dimensions.height) - this.ship_type){
                top = Number(board_dimensions.height) - this.ship_type
            }
        }

        return blessed.box({
            width: this._orientation === Orientation.Horizontal ? this._ship_dimensions.width : this._ship_dimensions.height,
            height: this._orientation === Orientation.Horizontal ? this._ship_dimensions.height : this._ship_dimensions.width, 
            hidden: false,
            top: top,
            left: left,
            style: {
                bg: "black"
            }
        })
    }
}