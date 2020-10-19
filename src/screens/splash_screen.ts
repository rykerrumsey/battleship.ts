import * as blessed from "blessed"
import { default_style, inverse_default_style } from "../styles"
import { load_asset } from "../utils"

const SPLASH_PATH = "assets/splash_screen.txt"

export default class SplashScreen {
    splash_data: string = load_asset(SPLASH_PATH)

    constructor() {}

    render(parent: blessed.Widgets.BoxElement, screen: blessed.Widgets.Screen, notify_select: () => void) {
        const splash = blessed.box({
            parent,
            bg: "white",
            fg: "black",
            content: this.splash_data,
            top: 0,
            left: "center",
            width: 78,
            height: 24
        })

        const menu = blessed.list({
            parent,
            width: 26,
            height: 2,
            mouse: true,
            keys: true,
            bottom: 1,
            left: "center",
            align: "center",
            style: {
                selected: inverse_default_style,
                item: default_style
            },
            items: ["NEW GAME", "QUIT"]
        })

        let text: string = ""

        menu.focus()
        menu.select(0)

        menu.on("select", (item, key) => {
            text = item.getText()
        })

        menu.on("keypress", (_, key) => {
            if(key.name === "enter") {
                if(text === "QUIT")
                    screen.destroy()
                else
                    notify_select()
            }
        })
    }
}