import * as blessed from "blessed"
import { default_style } from "../styles"

export const render_background = (width: number, height: number): blessed.Widgets.BoxElement => {
    return blessed.box({
        style: default_style,
        width,
        height
    })
}