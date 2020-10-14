class Player {
    playerNumber: number
    previousShots: number[] = []

    constructor(playerNumber:number) {
        this.playerNumber = playerNumber
    }
}

export { Player }