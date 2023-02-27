import { Component, OnInit } from '@angular/core';
import { Game } from 'src/classes/game_class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { calcRandomNumber } from 'src/functions/aux_functions';
import { DialogGameoverComponent } from '../dialog-gameover/dialog-gameover.component';
import { addDoc, collectionData, Firestore, getFirestore, onSnapshot, updateDoc } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
import { collection, CollectionReference, doc, setDoc } from '@firebase/firestore';
import { ActivatedRoute } from '@angular/router';

// import { environment } from 'src/environments/environment';
// import { initializeApp } from '@firebase/app';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  PICK_CARD_ANIMATION_TIME = 1200;
  cardStack = [0, 1, 2, 3];
  gameOver: boolean = false;
  game: Game;
  gameId: string;
  gameCollection: CollectionReference;
  // games$: Observable<any[]>;

  // app = initializeApp(environment.firebase);
  // db = getFirestore(this.app);

  constructor(public dialog: MatDialog, private firestore: Firestore, private route: ActivatedRoute) {
    // const games = collection(firestore, 'games');
    route.params.subscribe((params) => {

      console.log('URL.id: ', params['id']);

      this.gameId = params['id'];
      this.gameCollection = collection(firestore, 'games');
      // this.games$ = collectionData(this.gameCollection, {idField: 'id'});
      // this.games$.subscribe((dbGames) => {console.log('Aktuelle Spiele: ', dbGames)});
      // this.gameCollection = collection(this.db, 'games');
      onSnapshot(doc(firestore, 'games', params['id']), (doc) => {
        console.log('Document data:', doc.data());
        this.game.fromJson(doc.data());
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
        if (!this.gameOver) {
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
    // this.updateDatabase();
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
      this.gameOver = true;
      setTimeout(() => {
        this.openDialogGameOver();
      }, this.PICK_CARD_ANIMATION_TIME + 500)
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
      let playersAsString = JSON.stringify(this.game.players);
      this.gameOver = false;
      this.game.currentCard = '';
      this.newGame();
      this.game.players = JSON.parse(playersAsString);
      this.updateDatabase();
    });
  }
}
