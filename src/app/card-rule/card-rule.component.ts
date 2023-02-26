import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-card-rule',
  templateUrl: './card-rule.component.html',
  styleUrls: ['./card-rule.component.scss']
})
export class CardRuleComponent implements OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'Put your thumbs on the table. The last player drinks.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'Ask a question. Those who cannot answer must drink.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
    { title: 'Click on a card', description: '... and follow the rules.'}
  ];
  currentTitle: string = '';
  currentDesc: string = '';
  @Input() card: string = '';

  ngOnChanges(): void {

    if (!this.card) {this.card = 'card_14'};

    let cardNumber: number = +this.card.split('_')[1];
    this.currentTitle = this.cardAction[cardNumber - 1].title;
    this.currentDesc = this.cardAction[cardNumber - 1].description;
  }
}
