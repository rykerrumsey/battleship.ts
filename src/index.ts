import fs from "fs"
import * as blessed from "blessed"
import { Player } from "./player"

let default_style = {
    bg: "white",
    fg: "black"
}

let inverse_default_style = {
    fg: "white",
    bg: "black"
}

let screen = blessed.screen({
    smartCSR: true,
    autoPadding: true    
})

let background = blessed.box({
    parent: screen,
    style: default_style,
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
    style: default_style
})

//countdown_message
let countdown_message = blessed.box({
    parent:game_screen,
    width: 40,
    height: 5,
    content: "",
    border: "line",
    top: "center",
    left: "center",
    align: "center",
    style: default_style
})

let player2 = new Player(2, "red", "USSR")

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
        screen.render()
    }, 1000)
}

show_countdown_message(player2)

// splash screen
let splash = blessed.box({
    parent: game_screen,
    bg: "white",
    fg: "black",
    content: "",
    hidden: true,
    top: 0,
    left: "center",
    width: 78,
    height: 20
})

let menu = blessed.list({
    parent: game_screen,
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

menu.on("keypress", (_, key) => {
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



