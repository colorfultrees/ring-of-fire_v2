import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CardRuleComponent } from './card-rule/card-rule.component';
import { MatCardModule } from '@angular/material/card';
import { DialogGameoverComponent } from './dialog-gameover/dialog-gameover.component'; 

@NgModule({
  declarations: [
    AppComponent,
    StartscreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    CardRuleComponent,
    DialogGameoverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
