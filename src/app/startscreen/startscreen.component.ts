import { Component } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/classes/game_class';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent {
  gameCollection: CollectionReference;
  game: Game;

  constructor(private router: Router, private firestore: Firestore) {
    this.gameCollection = collection(firestore, 'games');
  }

  /**
   * Creates a new game and switches to the game board
   */
  async newGame() {
    this.game = new Game();
    const gameId = await this.writeToDatabase();
    this.router.navigateByUrl(`/game/${gameId}`);
  }


  /**
   * Writes the current game data to the database
   */
  async writeToDatabase() {
    let doc = await addDoc(this.gameCollection, this.game.toJson());
    return doc.id;
  }
}