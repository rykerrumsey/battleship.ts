import * as blessed from "blessed"
import { Color, Coordinates, Dimensions, ShipType } from "../types";
import { load_asset } from "../utils"

import Ship from "./ship"
import Player from "./player"
import { default_style } from "../styles";

export default class Board {
    ship_targets: Coordinates[] = []
    board_widget: blessed.Widgets.BoxElement = blessed.box({})
    board_label: blessed.Widgets.BoxElement = blessed.box({})
    active: boolean = true
    is_picking: boolean = false
    position_coordinate: Coordinates = {x: 32, y: 14}
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

    render(parent: blessed.Widgets.BoxElement, player: Player) {
        const instructions = load_asset("assets/instructions.txt")
        let left: string | number = 33

        if(this.is_picking) {
            blessed.box({
                parent,
                top: 1,
                left: "center",
                width: 65,
                height: 10,
                content: instructions,
                style: {
                    bg: Color.White,
                    fg: Color.Black
                }
            })
        } else {
            if(player.id === 1) {
                left = 15
            } else {
                left = 50
            }
        }

        this.board_label = blessed.box({
            parent,
            top: Number(this.position_coordinate.y) - 2,
            left,
            align: "center",
            style: {
                fg: player.color,
                bg: Color.White,
            },
            width: "shrink",
            height: 1,
            content: `Player ${player.id} - ${player.country_name}`
        })

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