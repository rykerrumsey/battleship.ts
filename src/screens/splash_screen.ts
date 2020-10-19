import * as blessed from "blessed"
import { load_asset } from "../utils"
import { render_menu } from "../components/menu"

export const splash_screen = (
    splash_path: string, 
    parent: blessed.Widgets.BoxElement, 
    screen: blessed.Widgets.Screen,
    callback: () => void): blessed.Widgets.BoxElement => {
    
    const data = load_asset(splash_path)

    const splash = blessed.box({
        parent,
        bg: "white",
        fg: "black",
        content: data,
        top: 0,
        left: "center",
        width: 78,
        height: 24
    })

    const menu = render_menu()

    let text: string = ""

    menu.focus()
    menu.select(0)

    menu.on("select", (item, key) => {
        text = item.getText()
    })

    menu.on("keypress", (_, key) => {
        if(key.name === "enter") {
            if(text === "QUIT") {
                screen.destroy()
            } else {
                parent.children = []
                screen.render()
                callback()
            }
        }
    })

    splash.append(menu)

    return splash
}