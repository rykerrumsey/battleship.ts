import * as blessed from "blessed"
import { Color, Coordinates, Dimensions, ShipType } from "../types";
import Ship from "./ship"

export default class Board {
    _ships: Ship[] = []
    _board_widget: blessed.Widgets.BoxElement = blessed.box({})

    active: boolean = true
    position_coordinate: Coordinates = { x: 0, y: 0 }
    ships_availible: Ship[] = [
        new Ship(ShipType.Cruiser),
        new Ship(ShipType.Carrier),
        new Ship(ShipType.Submarine),
        new Ship(ShipType.Destroyer),
        new Ship(ShipType.Battleship)
    ]
   
    constructor(
        readonly color: Color,
        readonly dimensions: Dimensions
    ) {}

    render(parent: blessed.Widgets.BoxElement) {
        this._board_widget = blessed.box({
            parent,
            width: this.dimensions.width,
            height: this.dimensions.height,
            clickable: true,
            style: {
                fg: Color.Black,
                bg: this.color
            },
            top: this.position_coordinate.y,
            left: this.position_coordinate.x,
            shadow: this.active
        })
    }

    place_ship(screen: any) {
        this._board_widget.on("mousemove", (data) => {
            this._board_widget.children = []

            const board_position = { x: this._board_widget.aleft, y: this._board_widget.atop }
            const mouse_position = { x: data.x, y: data.y }
            
            this._board_widget.append(this.ships_availible[0].draw(mouse_position, board_position, this.dimensions))
            screen.render()
        })

        this._board_widget.on("click", (data) => {
            const board_position = { x: this._board_widget.aleft, y: this._board_widget.atop }
            const mouse_position = { x: data.x, y: data.y }

            if(data.button === "middle") {
                this.ships_availible[0].toggle_orientation()
                this._board_widget.append(this.ships_availible[0].draw(mouse_position, board_position, this.dimensions))
                screen.render()
            } else {
                console.log(data)
                // add ship to board
            }
        })
        
        this._board_widget.on("mouseout", () => {
            this._board_widget.children = []
            screen.render()
        })
    }
}