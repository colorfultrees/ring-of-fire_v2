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


    /**
     * Writes the game data into a JSON
     * @returns JSON
     */
    public toJson() {
        return {
            players: this.players,
            cardStack: this.cardStack,
            playedCard: this.playedCard,
            currentPlayer: this.currentPlayer
        };
    }


    /**
     * Sets the game data
     * @param json The retrieved object from the database
     */
    public fromJson(json: any) {
        this.players = json.players;
        this.cardStack = json.cardStack;
        this.playedCard = json.playedCard;
        this.currentPlayer = json.currentPlayer;

        console.log('aktualisierte Spieldaten: ', this.toJson());
    }
}