import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnDestroy {

  private cardsSub !: Subscription;
  public cards: Array<Card> = [];
  
  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.getCard();
  }

  getCard(): void {
    this.cardsSub = this.httpService
    .getCard()
    .subscribe((cardsList: Array<Card>) => {
      this.cards = (cardsList).filter((card: any ) => {
        for ( let i=0; i < card.sources.drops.length; i++) {
          let cardregex = /Dungeon|Raid/g;
          if ((card.sources.drops[i]).match(cardregex)) {
            return card;
          }      
        }     
      });
    })
  }
  ngOnDestroy(): void {
    if (this.cardsSub){
      this.cardsSub.unsubscribe();
    }
  }
}
