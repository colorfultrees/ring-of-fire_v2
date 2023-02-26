import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent {

  constructor(private router: Router) {

  }

  /**
   * Switches to the game board
   */
  newGame() {
    this.router.navigateByUrl('/game');
  }

}
