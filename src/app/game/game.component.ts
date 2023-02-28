import { Component, OnInit } from '@angular/core';
import { Game } from 'src/classes/game_class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { calcRandomNumber } from 'src/functions/aux_functions';
import { DialogGameoverComponent } from '../dialog-gameover/dialog-gameover.component';
import { deleteDoc, Firestore, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { collection, CollectionReference, doc, Unsubscribe } from '@firebase/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  PICK_CARD_ANIMATION_TIME = 1200;
  cardStack = [0, 1, 2, 3];
  game: Game;
  gameId: string;
  gameCollection: CollectionReference;
  unsubscribe: Unsubscribe;

  constructor(public dialog: MatDialog, private firestore: Firestore, private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.gameCollection = collection(firestore, 'games');
      this.unsubscribe = onSnapshot(doc(firestore, 'games', params['id']), (doc) => {
        this.game.fromJson(doc.data());
        if (this.game.gameOver) {
          this.unsubscribe();
          setTimeout(() => {
            this.openDialogGameOver();
          }, this.PICK_CARD_ANIMATION_TIME + 500);
        }
      });
    });
  }

  ngOnInit(): void {
    this.newGame();
  }


  /**
   * Initiates a new game
   */
  newGame() {
    this.game = new Game();
  }


  /**
   * Updates the game data in the database
   */
  updateDatabase() {
    updateDoc(doc(this.gameCollection, this.gameId), this.game.toJson());
  }


  /**
   * Handles the click on the top card
   */
  pickCard() {
    if (!this.hasPlayers()) return;

    if (!this.game.isCardPicked) {
      this.setCurrentCard();
      this.isGameOver();
      this.updateDatabase();
      
      setTimeout(() => {
        this.setPlayedCard();
        if (!this.game.gameOver) {
          setTimeout(() => {
            this.setCurrentPlayer();
          }, 500);
        }
      }, this.PICK_CARD_ANIMATION_TIME);
    }
  }


  /**
   * Checks if at least two players are registered
   * @returns Boolean
   */
  hasPlayers() {
    if (this.game.players.length < 2) {
      this.openDialog();
      return false;
    }
    return true;
  }


  /**
   * Sets the current card
   */
  setCurrentCard() {
    this.game.currentCard = this.game.cardStack.pop();
    this.game.isCardPicked = true;
  }


  /**
   * Sets the card on the stack of played cards
   */
  setPlayedCard() {
    this.game.playedCard = this.game.currentCard;
    this.game.isCardPicked = false;
    this.updateDatabase();
  }


  /**
   * Sets the next player
   */
  setCurrentPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.updateDatabase();
  }


  /**
   * Checks if the game is over
   */
  isGameOver() {
    if (this.game.cardStack.length == 0) {
      this.game.gameOver = true;
    }
  }


  /**
   * Opens the dialog for adding a new player
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.game.players.push({'name': name, 'img': calcRandomNumber(1, 5)});
        this.updateDatabase();
      }
    });
  }


  /**
   * Opens the dialog at the end of the game
   */
  openDialogGameOver(): void {
    const dialogRef = this.dialog.open(DialogGameoverComponent);

    dialogRef.afterClosed().subscribe(() => {
      try {
        deleteDoc(doc(this.gameCollection, this.gameId));
      } catch {};
    });
  }
}