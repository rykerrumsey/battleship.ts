import * as blessed from "blessed"
import { Color, Coordinates, Dimensions, ShipType } from "../types";
import Ship from "./ship"

export default class Board {
    ship_targets: Coordinates[] = []
    board_widget: blessed.Widgets.BoxElement = blessed.box({})
    active: boolean = true
    position_coordinate: Coordinates = { x: 0, y: 0 }
    ships_availible: Ship[] = [
        new Ship(ShipType.Cruiser)
        // new Ship(ShipType.Carrier),
        // new Ship(ShipType.Submarine),
        // new Ship(ShipType.Destroyer),
        // new Ship(ShipType.Battleship)
    ]
   
    constructor(
        readonly color: Color,
        readonly dimensions: Dimensions
    ) {}

    render(parent: blessed.Widgets.BoxElement) {
        this.board_widget = blessed.box({
            parent,
            width: this.dimensions.width,
            height: this.dimensions.height,
            clickable: this.active,
            style: {
                fg: Color.Black,
                bg: this.color
            },
            top: this.position_coordinate.y,
            left: this.position_coordinate.x,
            shadow: this.active
        })
    }

    place_ship(screen: blessed.Widgets.Screen, callback: () => void) {
        this.board_widget.on("mousemove", (data) => {
            this.board_widget.children = []

            const board_position = { x: this.board_widget.aleft, y: this.board_widget.atop }
            const mouse_position = { x: data.x, y: data.y }
            
            this.board_widget.append(this.ships_availible[0].draw(mouse_position, board_position, this.dimensions))
            screen.render()
        })

        this.board_widget.on("click", (data) => {
            const board_position = { x: this.board_widget.aleft, y: this.board_widget.atop }
            const mouse_position = { x: data.x, y: data.y }

            if(data.button === "middle") {
                this.ships_availible[0].toggle_orientation()
                this.board_widget.append(this.ships_availible[0].draw(mouse_position, board_position, this.dimensions))
                screen.render()
            } else {
                const ship_start_coordinate = { x: data.x - Number(board_position.x), y: data.y - Number(board_position.y)}
                const local_ship_coordinates = this.ships_availible[0].calculate_ship_section_coordinates(ship_start_coordinate)
                
                this.ship_targets.push(...local_ship_coordinates)

                this.active = false

                this.board_widget.destroy()

                callback()
            }
        })
        
        this.board_widget.on("mouseout", () => {
            this.board_widget.children = []
            screen.render()
        })
    }
}