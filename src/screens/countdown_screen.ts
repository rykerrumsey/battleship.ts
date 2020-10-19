import * as blessed from "blessed"
import { default_style } from "../styles"

export const render_countdown = (player_id: number) => {
    let countdown_message = blessed.box({
        width: 40,
        height: 5,
        content: "",
        border: "line",
        top: "center",
        left: "center",
        align: "center",
        style: default_style
    })

    const message = `Close your eyes Player ${player_id} ...`
    
    countdown_message.setContent(message)
    
    return countdown_message
}