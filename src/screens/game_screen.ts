import * as blessed from "blessed"
import { default_style } from "../styles"

export const render_game_screen = (width: number, height: number): blessed.Widgets.BoxElement => {
    return blessed.box({
        top: "center",
        left: "center",
        width,
        height,
        // border: "line",
        padding: {
            left: 2,
            right: 2,
            top: 1,
            bottom: 1
        },
        style: default_style
    })
}