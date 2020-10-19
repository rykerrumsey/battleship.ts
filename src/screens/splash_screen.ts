import * as blessed from "blessed"

export const splash_screen = () => {
    return blessed.box({
        bg: "white",
        fg: "black",
        content: "",
        hidden: true,
        top: 0,
        left: "center",
        width: 78,
        height: 20
    })
}


// menu.focus()
// menu.select(0)

// menu.on("select", (item, key) => {
//     text = item.getText()
// })

// menu.on("keypress", (_, key) => {
//     if(key.name === "enter") {
//         if(text === "QUIT") {
//             screen.destroy()
//             return
//         } else {
//             splash.hide()
//             menu.hide()
//             screen.render()
//             return
//         }
//     }
// })