import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlueMage, Card, Dungeon, MatchedItem, Minion, Mount, Orchestrion, } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public dungeonInfo: Array<MatchedItem> = []; // This is the end product, with Dungeon data such as Name, and Minion, Orchestrion and Mount data for that Dungeon.

  public dungeons: Array<Dungeon> = [];
  public minions: Array<Minion> = [];
  public spells: Array<BlueMage> = [];
  public cards: Array<Card> = [];
  public mounts: Array<Mount> = [];
  public orchestrions: Array<Orchestrion> = [];

  private minionSub !: Subscription;
  private spellsSub !: Subscription;
  private cardsSub !: Subscription;
  private orchestrionSub !: Subscription;
  private mountSub !: Subscription;
  private dungeonSub !: Subscription;

  constructor(
    private httpService : HttpService,
  ) { }

  ngOnInit(): void {
    this.httpService.test().subscribe((results: any) =>{ console.log(results)});
    this.getMinions();
    this.getOrchestrions();
    this.getMounts();
    this.getBlueMage();
    this.getCard();
    this.getDungeons();
    setTimeout(() => {this.matchItems(this.dungeons);}, 2000);
  }

  getDungeons(): void {
    this.dungeonSub = this.httpService
    .getDungeons()
    .subscribe((dungeon: Array<Dungeon>) => {
      for (let i = 0; i < dungeon.length; i++){
        this.dungeons.push(dungeon[i]);
      }
    })
  } 

  getMinions(): void {
    this.minionSub = this.httpService
    .getMinions()
    .subscribe((minionList: Array<Minion>) => {
      this.minions = (minionList).filter((minion: any) => {
        return minion.sources[0].type == 'Dungeon';
      });
    })
  }

  getBlueMage(): void {
    this.spellsSub = this.httpService
    .getBlueMage()
    .subscribe((spellsList: Array<BlueMage>) => {
      this.spells = spellsList;
      console.log(this.spells)
    })
  }

  getCard(): void {
    this.cardsSub = this.httpService
    .getCard()
    .subscribe((cardsList: Array<Card>) => {
      this.cards = (cardsList).filter((card: any ) => {
        if (card.sources.drops[0]) { 
        return (card.sources.drops[0]).includes('Dungeon')} 
        else {
        return 
        };
      });
      console.log(this.cards)
    })
  }

  getOrchestrions(): void {
    this.orchestrionSub = this.httpService
    .getOrchestrions()
    .subscribe((orchestrionList: Array<Orchestrion>) => {
      this.orchestrions = (orchestrionList).filter((orchestrion: any) => {
        return orchestrion.category.name == 'Dungeons';
      });
    })
  }

  getMounts(): void {
    this.mountSub = this.httpService
    .getMounts()
    .subscribe((mountList: Array<Mount>) => {
      this.mounts = (mountList).filter((mount: any) => {
        return mount.sources[0].type == 'Dungeon';
      });
    })
  }

  matchItems(dungeons: Array<Dungeon>): void {
    for (let i = 0; i < dungeons.length; i++){
      let dungeonName = dungeons[i].name;
      
      let dungeonMinions = (this.minions).filter((minion: any) => {
        return minion.sources[0].text.includes(dungeonName);
      });
      let dungeonMounts = (this.mounts).filter((mount: any) => {
        return mount.sources[0].text.includes(dungeonName);
      });
      let dungeonOrchestrions = (this.orchestrions).filter((orchestrion: any) => {
        return orchestrion.description.includes(`${dungeonName}.`);
      });
      let newItem: MatchedItem = {
        dungeon: this.dungeons[i],
      }
      if(dungeonMinions.length != 0){
        newItem.minions = dungeonMinions;
      }
      if(dungeonOrchestrions.length != 0){
        newItem.orchestrions = dungeonOrchestrions;
      }
      if(dungeonMounts.length != 0){
        newItem.mounts = dungeonMounts;
      }
      this.dungeonInfo.push(newItem);
    }
  }

  ngOnDestroy(): void {
    if (this.minionSub){
      this.minionSub.unsubscribe();
    }
    if (this.orchestrionSub){
      this.orchestrionSub.unsubscribe();
    }
    if (this.mountSub){
      this.mountSub.unsubscribe();
    }
    if (this.dungeonSub){
      this.dungeonSub.unsubscribe();
    }
    if (this.spellsSub){
      this.spellsSub.unsubscribe();
    }
    if (this.cardsSub){
      this.cardsSub.unsubscribe();
    }
  }
}
