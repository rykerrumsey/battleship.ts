import * as blessed from "blessed"
import { default_style } from "../styles"
import { Color } from "../types"

export const render_countdown = (player_id: number) => {
    let countdown_message = blessed.box({
        width: 40,
        height: 5,
        content: "",
        border: "line",
        top: "center",
        left: "center",
        align: "center",
        style: {
            ...default_style,
            border: {
                bg: Color.White,
                fg: Color.Black
            }
        }
    })

    const message = `Close your eyes Player ${player_id} ...`
    
    countdown_message.setContent(message)
    
    return countdown_message
}