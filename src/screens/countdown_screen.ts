import * as blessed from "blessed"
import { default_style } from "../styles"
import Player from "../models/player"

let countdown_message = blessed.box({
    width: 40,
    height: 5,
    hidden: true,
    content: "",
    border: "line",
    top: "center",
    left: "center",
    align: "center",
    style: default_style
})

const show_countdown_message = (player: Player) => {
    const message = `Close your eyes Player ${player.id} ...`
    
    let countdown_value = 5
    countdown_message.setContent(message)
    countdown_message.setLine(2, countdown_value.toString())

    let t = setInterval(() => {
        if(countdown_value <= 1) {
            clearInterval(t)
            countdown_message.hide()
        }
        countdown_value--
        countdown_message.setLine(2, countdown_value.toString())
    }, 1000)
}