import * as blessed from "blessed"
import { Color, Dimensions, ShipType } from "../types"
import { render_background } from "../screens/background"
import { render_game_screen } from "../screens/game_screen"
import { render_splash_screen } from "../screens/splash_screen"
import { render_countdown } from "../screens/countdown_screen"
import Player from "./player"

const GAME_WIDTH = 86
const GAME_HEIGHT = 28
const PLAYER_ONE_COUNTRY = "USA"
const PLAYER_ONE_COLOR = Color.Blue
const PLAYER_TWO_COUNTRY = "USSR"
const PLAYER_TWO_COLOR = Color.Red
const SPLASH_PATH = "assets/splash_screen.txt"
const BOARD_WIDTH = 16
const BOARD_HEIGHT = 8

export default class Game {
    private screen: blessed.Widgets.Screen
    private width: number
    private height: number
    private game_screen: blessed.Widgets.BoxElement 
    private board_dimensions: Dimensions = { width: BOARD_WIDTH, height: BOARD_HEIGHT}
    private player1: Player
    private player2: Player

    constructor() {
        this.screen = blessed.screen({
            smartCSR: true,
            autoPadding: true
        })
        this.width = <number>this.screen.width
        this.height = <number>this.screen.height
        
        this.game_screen = render_game_screen(GAME_WIDTH, GAME_HEIGHT)
        
        this.player1 = new Player(1, PLAYER_ONE_COLOR, PLAYER_ONE_COUNTRY, this.board_dimensions) //, this.game_screen)
        this.player2 = new Player(2, PLAYER_TWO_COLOR, PLAYER_TWO_COUNTRY, this.board_dimensions) //, this.game_screen)

        const background = render_background(this.width, this.height)

        this.screen.append(background)
        background.append(this.game_screen)
    }
    
    play() {
        render_splash_screen(SPLASH_PATH, this.game_screen, this.screen, () => this.start_countdown(this.player2))    

        this.screen.on("keypress", (_, key) => {
            if(key.name === "q") {
                this.screen.destroy()
            }
        })        

        this.screen.render()
    }

    start_countdown(player: Player) {
        const countdown_screen = render_countdown(2)
        this.game_screen.append(countdown_screen)

        let countdown_value = 5
        countdown_screen.setLine(2, countdown_value.toString())

        let t = setInterval(() => {
            if(countdown_value <= 1) {
                clearInterval(t)
                countdown_screen.destroy()
                this.player1.show_picker(this.screen)
            }
            countdown_value--
            countdown_screen.setLine(2, countdown_value.toString())
            this.screen.render()
        }, 1000)
        
        this.screen.render()
    }
}