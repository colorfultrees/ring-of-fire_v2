import { shuffleArray } from "src/functions/aux_functions";

export class Game {
    private CARD_TYPES = ['clubs', 'diamonds', 'hearts', 'spade'];
    public players: any[] = []; // data structure: {playerName: <string>, playerImg: <number>}
    public cardStack: string[] = [];
    public playedCard: string = '';
    public currentPlayer: number = 0;

    constructor() {
        // Fill the card stack
        this.CARD_TYPES.forEach(type => {
            for (let i = 1; i <= 13; i++) {
                this.cardStack.push(`${type}_${i}`);
            }
        })

        // Shuffle the stack
        shuffleArray(this.cardStack);
    }
}