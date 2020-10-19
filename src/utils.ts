import fs from "fs"

export const load_asset = (path: string): string => {
    let text: string = ""

    try {
        const data = fs.readFileSync(path, "utf8")
        return data
    } catch (err) {
        return err
    }
}