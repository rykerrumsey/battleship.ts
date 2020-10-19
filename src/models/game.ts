import * as blessed from "blessed"
import { Color, ShipType } from "../types"
import { render_background } from "../screens/background"
import { render_game_screen } from "../screens/game_screen"
// import SplashScreen from "../screens/splash_screen"
import Ship from "./ship"
import Player from "./player"
import Board from "./board"

const GAME_WIDTH = 88
const GAME_HEIGHT = 30
const PLAYER_ONE_COUNTRY = "USA"
const PLAYER_ONE_COLOR = Color.Blue
const PLAYER_TWO_COUNTRY = "USSR"
const PLAYER_TWO_COLOR = Color.Red

export default class Game {
    private _screen: blessed.Widgets.Screen
    private _width: number
    private _height: number

    constructor() {
        this._screen = blessed.screen({
            smartCSR: true,
            autoPadding: true
        })

        this._width = <number>this._screen.width
        this._height = <number>this._screen.height
    }

    play() {
        const background = render_background(this._width, this._height)
        this._screen.append(background)

        const game_screen = render_game_screen(GAME_WIDTH, GAME_HEIGHT)
        background.append(game_screen)

        const ships_availible: Ship[] = [
            new Ship(ShipType.Cruiser),
            new Ship(ShipType.Carrier),
            new Ship(ShipType.Submarine),
            new Ship(ShipType.Destroyer),
            new Ship(ShipType.Battleship)
        ]

        const player1 = new Player(1, PLAYER_ONE_COLOR, PLAYER_ONE_COUNTRY)
        const player2 = new Player(2, PLAYER_TWO_COLOR, PLAYER_TWO_COUNTRY)

        let board_element = new Board(Color.Blue, {width: 16, height: 8}, game_screen)

        board_element.position_coordinate = {x: "center", y: "center"}
        board_element.place_ship(ships_availible[0], this._screen)

        this._screen.on("keypress", (_, key) => {
            if(key.name === "q") {
                this._screen.destroy()
            }
        })
        
        this._screen.render()
    }
}