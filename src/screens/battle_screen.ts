import * as blessed from "blessed"
import { default_style } from "../styles"
import Player from "../models/player"
import { load_asset } from "../utils"
import { Color } from "../types"

const TRANSMISSION_LABEL = "Incoming transmission..."
const HEADER_PATH = "assets/battle.txt"

export default class BattleScreen {

    constructor(
        readonly player1: Player,
        readonly player2: Player
    ) {}

    render(parent: blessed.Widgets.BoxElement, screen: blessed.Widgets.Screen, current_turn: number) {
        const header = blessed.box({
            parent,
            style: default_style,
            content: load_asset(HEADER_PATH),
            top: 0,
            left: "center",
            align: "center",
            width: "98%",
            height: 5
        })

        const turn_counter = blessed.box({
            parent,
            top: "50%-3",
            left: "center",
            height: 1,
            align: "center",
            width: "shrink",
            style: default_style,
            content: `TURN ${current_turn}`
        })

        const transmission = blessed.message({
            parent,
            style: {
                bg: Color.White,
                fg: Color.Blue,
                border: default_style,
                label: default_style
            },
            shadow: true, 
            label: TRANSMISSION_LABEL,
            width: "80%",
            border: "line",
            height: 5,
            left: "center",
            bottom: 1,
            align: "center",
            valign: "middle",
            content: "USSR SPOTTED!!! You are clear to take a shot."
        })
        
        this.player1.board.is_picking = false
        this.player2.board.is_picking = false

        this.player1.board.board_label.left = 20
        this.player2.board.board_label.left = 50

        this.player1.board.position_coordinate.x = 14
        this.player1.board.position_coordinate.y = 9
        this.player1.board.active = false
        this.player1.board.render(parent, this.player1)

        this.player2.board.position_coordinate.x = 50
        this.player2.board.position_coordinate.y = 9
        this.player2.board.active = true
        this.player2.board.render(parent, this.player2)
    }
}