import fs from "fs"
import * as blessed from "blessed"

let screen = blessed.screen({
    smartCSR: true,
    autoPadding: true    
})

let background = blessed.box({
    parent: screen,
     bg: "white",
    fg: "black",
    width: screen.width,
    height: screen.height
})

let game_screen = blessed.box({
    parent: background,
    top: "center",
    left: "center",
    width: 88,
    height: 30,
    border: "line",
    padding: {
        left: 2,
        right: 2,
        top: 2,
        bottom: 2
    },
    style: {
        bg: "white",
        fg: "black"
    }
})

let splash = blessed.box({
    parent: game_screen,
    bg: "white",
    fg: "black",
    content: "",
    top: 0,
    left: "center",
    width: 78,
    height: 20
})

let menu = blessed.list({
    parent: game_screen,
    width: 26,
    height: 2,
    mouse: true,
    keys: true,
    bottom: 0,
    left: "center",
    align: "center",
    style: {
        selected: {
            fg: "white",
            bg: "black"
        },
        item: {
            fg: "black",
            bg: "white"
        }
    },
    items: ["NEW GAME", "QUIT"]
})

let text: string = ""

try {
    const data = fs.readFileSync('./assets/splash_screen.txt', 'utf8')
    splash.setContent(data)
} catch (err) {
  console.error(err)
}

menu.focus()
menu.select(0)

menu.on("select", (item, key) => {
    text = item.getText()
})

menu.on("keypress", (item, key) => {
    if(key.name === "enter") {
        if(text === "QUIT") {
            screen.destroy()
            return
        } else {
            splash.hide()
            menu.hide()
            screen.render()
            return
        }
    }
})

screen.on("keypress", (_, key) => {
    if(key.name === "q") {
        screen.destroy()
    }
})

screen.render()



