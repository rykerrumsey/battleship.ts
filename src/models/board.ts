import * as blessed from "blessed"

import { Color, Coordinates, Dimensions } from "../types";
import Ship from "./ship"

export default class Board {
    _ships: Ship[] = []
    _board_widget: blessed.Widgets.BoxElement

    active: boolean = true
    position_coordinate: Coordinates = { x: 0, y: 0 }
   
    constructor(
        readonly color: Color,
        readonly dimensions: Dimensions,
        readonly parent: blessed.Widgets.BoxElement,
    ) {
        this._board_widget = blessed.box({
            parent: parent,
            width: dimensions.width,
            height: dimensions.height,
            clickable: true,
            style: {
                fg: Color.Black,
                bg: color
            },
            top: this.position_coordinate.y,
            left: this.position_coordinate.x,
            shadow: this.active
        })
    }

    place_ship(ship: Ship, screen: any) {
        this._board_widget.on("mousemove", (data) => {
            this._board_widget.children = []

            const board_position = { x: this._board_widget.aleft, y: this._board_widget.atop }
            const mouse_position = { x: data.x, y: data.y }
            
            this._board_widget.append(ship.draw(mouse_position, board_position, this.dimensions))
            
            screen.render()
        })

        this._board_widget.on("click", (data) => {
            const board_position = { x: this._board_widget.aleft, y: this._board_widget.atop }
            const mouse_position = { x: data.x, y: data.y }

            if(data.button === "middle") {
                ship.toggle_orientation()
                this._board_widget.append(ship.draw(mouse_position, board_position, this.dimensions))
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

    draw() {
        return this._board_widget
    }
}