import * as blessed from "blessed"
import { Color, Dimensions, ShipType } from "../types"
import { render_background } from "../screens/background"
import { render_game_screen } from "../screens/game_screen"
import SplashScreen from "../screens/splash_screen"
import BattleScreen from "../screens/battle_screen"
import { render_countdown } from "../screens/countdown_screen"
import Player from "./player"
import { clear } from "console"

const GAME_WIDTH = 86
const GAME_HEIGHT = 28
const PLAYER_ONE_COUNTRY = "USA"
const PLAYER_ONE_COLOR = Color.Blue
const PLAYER_TWO_COUNTRY = "USSR"
const PLAYER_TWO_COLOR = Color.Red
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
        
        this.player1 = new Player(1, PLAYER_ONE_COLOR, PLAYER_ONE_COUNTRY, this.board_dimensions)
        this.player2 = new Player(2, PLAYER_TWO_COLOR, PLAYER_TWO_COUNTRY, this.board_dimensions)

        const background = render_background(this.width, this.height)

        this.screen.append(background)
        background.append(this.game_screen)
    }
    
    get_selected_option(): void {
        this.clear_game_screen()
        this.start_countdown(this.player1, 2)
    }

    play() {
        this.clear_game_screen()

        const splash_screen = new SplashScreen()
        splash_screen.render(this.game_screen, this.screen, this.get_selected_option.bind(this))

        this.screen.render()

        this.screen.on("keypress", (_, key) => {
            if(key.name === "q") {
                this.screen.destroy()
            }
        })        
    }

    place_player1_ships(player: Player) {
        player.board.is_picking = true
        player.board.position_coordinate.x = 32
        player.board.position_coordinate.y = 16
        player.board.render(this.game_screen, player)
        player.board.place_ship(this.screen, () => this.start_countdown(this.player2, 1))
        this.screen.render()
    }

    place_player2_ships(player: Player) {
        player.board.is_picking = true
        player.board.position_coordinate.x = 32
        player.board.position_coordinate.y = 16
        player.board.render(this.game_screen, player)
        player.board.place_ship(this.screen, () => this.battle())
        player.board.active = true
        this.screen.render()
    }

    battle() {
        this.clear_game_screen()
        
        const battle_screen: BattleScreen = new BattleScreen(this.player1, this.player2)
        let current_turn = 1

        battle_screen.render(this.game_screen, this.screen, current_turn)
        this.screen.render()

        // let gameover: boolean = false
        // let winner: Player

        // while(!gameover) {
        //     this.player1.take_shot(this.player2)
            
        //     if (this.player2.is_sunk) {
        //         gameover = true
        //         winner = this.player1
        //     }

        //     this.player2.take_shot(this.player1)

        //     if(this.player1.is_sunk) {
        //         gameover = true
        //         winner = this.player2
        //     }
        //      current_turn++
        // }

        let t = setInterval(() => {
            this.play()
            // render_victory(winner)
            clearInterval(t)
        }, 3000)
    }

    clear_game_screen() {
        this.game_screen.children = []
        this.screen.render()
    }

    start_countdown(player: Player, other_player_id: number): void {
        this.clear_game_screen()
        const countdown_screen = render_countdown(other_player_id)
        this.game_screen.append(countdown_screen)

        let countdown_value = 5
        countdown_screen.setLine(2, countdown_value.toString())

        let t = setInterval(() => {
            if(countdown_value <= 1) {
                clearInterval(t)
                countdown_screen.destroy()
                if(player.id === 1)
                    this.place_player1_ships(player)
                else
                    this.place_player2_ships(player)
            }
            countdown_value--
            countdown_screen.setLine(2, countdown_value.toString())
            this.screen.render()
        }, 1000)
        
        this.screen.render()
    }
}