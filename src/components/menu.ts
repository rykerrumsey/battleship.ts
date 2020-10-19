import * as blessed from "blessed"
import { default_style, inverse_default_style } from "../styles"

export const menu = () => {
    return blessed.list({
        width: 26,
        hidden: true,
        height: 2,
        mouse: true,
        keys: true,
        bottom: 0,
        left: "center",
        align: "center",
        style: {
            selected: inverse_default_style,
            item: default_style
        },
        items: ["NEW GAME", "QUIT"]
    })
}