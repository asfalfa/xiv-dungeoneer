import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlueMage, Card, CharacterInfo, Dungeon, MatchedItem, Minion, Mount, Orchestrion, XIVAPIResponse } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {
  public dungeonInfo: Array<MatchedItem> = [];

  public charId!: number;
  public character !: CharacterInfo;
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
  private routeSub !: Subscription;
  private charSub !: Subscription;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: HttpService
    ) { }

  hideOwnedMinions(): void {
    let ownedMinions = document.querySelectorAll<HTMLElement>('.owned');

    for (let i = 0; i < ownedMinions.length; i++){
      if (ownedMinions[i].style.display !=="none") {
        ownedMinions[i].style.display ="none"
      }
      else {
        ownedMinions[i].style.display ="block"
      }  
    } 
  }
  ownedOrchestrionRoll(orchestrion: string): void {
    let characterData = localStorage.getItem(this.character.name)
    if(characterData){
      let character = JSON.parse(characterData);
      if(character.orchestrions.includes(orchestrion)){
        let foundOrchestrion = character.orchestrions.includes(orchestrion);
        if (foundOrchestrion == "true") {
          let data = {
            foundOrchestrion: "false"
          }
          character.orchestrions.push(data)
          localStorage.setItem(this.character.name,  JSON.stringify(character))
          }
        else {
          let data = {
            foundOrchestrion: "true"
          }
          character.orchestrions.push(data)
          localStorage.setItem(this.character.name,  JSON.stringify(character))
        }
      }
    }
  } 
  ownedCard(card: string): void {
    let ownedCard = localStorage.getItem(card)

    if (ownedCard =="true") {
      localStorage.setItem(card, "false")
      }
    else {
      localStorage.setItem(card, "true")
    }
  }

  ownedSpell(spell: string): void {
    let ownedSpell = localStorage.getItem(spell)

    if (ownedSpell =="true") {
      localStorage.setItem(spell, "false")
      }
    else {
      localStorage.setItem(spell, "true")
    }
  }


  displayLocalStorage(): void {
    const storage = { ...localStorage };
    const items = Object.entries(storage);

    for (let i = 0; i < items.length; i++){
      let element = document.getElementById(items[i][0])
      if (items[i][1] == "true") {
        if (element) {
          element.setAttribute("checked", "checked")
      }
    }


    }
    // We have all the localStorage data in an array, we should loop over it and check if their value is true or false, then check the checkbox or not depending on that
  }

  ngOnInit(): void {
    this.getMinions();
    this.getOrchestrions();
    this.getMounts();
    this.getBlueMage();
    this.getCard();
    this.getDungeons();
    setTimeout(() => {
      this.matchItems(this.dungeons);
      this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
        this.charId = params['id'];
        this.getCharDetails(this.charId);
      });
    }, 2000);
  }

  getCharDetails(id: number): void {
    this.charSub = this.httpService
      .getCharDetails(id).subscribe((CharacterInfo: CharacterInfo) => {
        this.character = CharacterInfo;
        let characterData = {
          name: this.character.name,
          orchestrions: [],
          cards: null,
          spells: null,
        }
        localStorage.setItem(characterData.name, JSON.stringify(characterData));
        this.characterCheck();
      })
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
      this.minions = (minionList).filter(minion => {
        return minion.sources[0].type == 'Dungeon';
      });
    })
  }

  getBlueMage(): void {
    this.spellsSub = this.httpService
    .getBlueMage()
    .subscribe((spellsList: Array<BlueMage>) => {
      this.spells = spellsList;
    })
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
      this.mounts = (mountList).filter(mount => {
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
        if(orchestrion.description){
          return orchestrion.description.includes(`${dungeonName}.`);
        }
      });
      let dungeonCards = (this.cards).filter((card: any) => {
        for ( let i = 0; i < card.sources.drops.length; i++) {
          if (card.sources.drops[i].includes(dungeonName)) {
            return card;
          }
        }
      });
      let dungeonSpells = (this.spells).filter((spell: any) => {
        for ( let i = 0; i < spell.sources.length; i++) {
          if (spell.sources[i].text.includes(dungeonName)) {
            return spell;
          }
        }
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
      if(dungeonCards.length != 0){
        newItem.cards = dungeonCards;
      }
      if(dungeonSpells.length != 0){
        newItem.spells = dungeonSpells;
      }
      this.dungeonInfo.push(newItem);
    }
  }

  characterCheck(): void {
    for (let i = 0; i < this.minions.length; i++) {
      for (let j = 0; j < this.character.minions.length; j++){
        if(this.character.minions[j].Name == this.minions[i].name){
          this.minions[i].player_owns = true;
        }
      }
    }
    for (let i = 0; i < this.mounts.length; i++) {
      for (let j = 0; j < this.character.mounts.length; j++){
        if(this.character.mounts[j].Name == this.mounts[i].name){
          this.mounts[i].player_owns = true;
        }
      }
    }
    this.displayLocalStorage();
  }

  ngOnDestroy(): void {
    if (this.charSub){
      this.charSub.unsubscribe();
    }
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
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
