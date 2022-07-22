import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, CharacterInfo, Dungeon, MatchedItem, Minion, Mount, Orchestrion, XIVAPIResponse } from 'src/app/models';
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
  public mounts: Array<Mount> = [];
  public orchestrions: Array<Orchestrion> = [];

  private minionSub !: Subscription;
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

  displayLocalStorage(): void {
    const storage = { ...localStorage };
    const items = Object.entries(storage);
    console.log(items);
    // We have all the localStorage data in an array, we should loop over it and check if their value is true or false, then check the checkbox or not depending on that
  }

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.charId = params['id'];
      this.getCharDetails(this.charId);
    });
    this.getMinions();
    this.getOrchestrions();
    this.getMounts();
    this.getDungeons();
    setTimeout(() => {this.matchItems(this.dungeons);}, 2000);
  }

  getCharDetails(id: number): void {
    this.charSub = this.httpService
      .getCharDetails(id).subscribe((CharacterInfo: CharacterInfo) => {
        this.character = CharacterInfo;
        console.log(this.character);
        this.characterCheck();
      })
  }

  getDungeons(): void {
    this.dungeonSub = this.httpService
    .getDungeons()
    .subscribe((dungeon: XIVAPIResponse<Dungeon>) => {
      for (let i = 0; i < dungeon.Results.length; i++){
        this.dungeons.push(dungeon.Results[i]);
      }
    })
  }

  getMinions(): void {
    this.minionSub = this.httpService
    .getMinions()
    .subscribe((minionList: APIResponse<Minion>) => {
      this.minions = (minionList.results).filter(minion => {
        return minion.sources[0].type == 'Dungeon';
      });
    })
  }

  getOrchestrions(): void {
    this.orchestrionSub = this.httpService
    .getOrchestrions()
    .subscribe((orchestrionList: APIResponse<Orchestrion>) => {
      this.orchestrions = (orchestrionList.results).filter(orchestrion => {
        return orchestrion.category.name == 'Dungeons';
      });
    })
  }

  getMounts(): void {
    this.mountSub = this.httpService
    .getMounts()
    .subscribe((mountList: APIResponse<Mount>) => {
      this.mounts = (mountList.results).filter(mount => {
        return mount.sources[0].type == 'Dungeon';
      });
    })
  }

  matchItems(dungeons: Array<Dungeon>): void {
    for (let i = 0; i < dungeons.length; i++){
      let dungeonName = dungeons[i].Name;
      
      let dungeonMinions = (this.minions).filter(minion => {
        return minion.sources[0].text.includes(dungeonName);
      });
      let dungeonMounts = (this.mounts).filter(mount => {
        return mount.sources[0].text.includes(dungeonName);
      });
      let dungeonOrchestrions = (this.orchestrions).filter(orchestrion => {
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
    console.log(this.dungeonInfo);
  }

  characterCheck(): void {
    for (let i = 0; i < this.minions.length; i++) {
      for (let j = 0; j < this.character.Minions.length; j++){
        if(this.character.Minions[j].Name == this.minions[i].name){
          this.minions[i].player_owns = true;
        }
      }
    }
    for (let i = 0; i < this.mounts.length; i++) {
      for (let j = 0; j < this.character.Mounts.length; j++){
        if(this.character.Mounts[j].Name == this.mounts[i].name){
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
  }
}
