import * as blessed from "blessed"
import { Color, Coordinates, Dimensions } from "../src/types"
import Board from "../src/models/board"

describe("Board Class", () => {
    const screen = blessed.screen({})
    const parent = blessed.box({parent: screen})

    let board: Board

    beforeEach(() => {
        let color: Color = Color.Red
        let dimensions: Dimensions = { width: 8, height: 8 }
        
        board = new Board(color, dimensions)
    })

    test("should initialize board with specific color and proper dimensions", () => {
        expect(board.active).toBeTruthy()
        expect(board.dimensions).toStrictEqual({ width: 8, height: 8 })
        expect(board.color).toBe(Color.Red)
        expect(board.ship_targets).toHaveLength(0)
        expect(board.position_coordinate).toStrictEqual({ x: 32, y: 14 })
    })
})