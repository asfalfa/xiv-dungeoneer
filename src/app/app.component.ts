import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIResponse, Dungeon, DungeonDetails, MatchedItem, Minion, Mount, Orchestrion, XIVAPIResponse } from './models';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public dungeonInfo: Array<MatchedItem> = []; // This is the end product, with Dungeon data such as Name, and Minion, Orchestrion and Mount data for that Dungeon.

  public dungeons: Array<Dungeon> = [];
  public minions: Array<Minion> = [];
  public mounts: Array<Mount> = [];
  public orchestrions: Array<Orchestrion> = [];

  private minionSub !: Subscription;
  private orchestrionSub !: Subscription;
  private mountSub !: Subscription;
  private dungeonSub !: Subscription;

  constructor(
    private httpService : HttpService,
  ){}

  ngOnInit(): void {
    this.getMinions();
    this.getOrchestrions();
    this.getMounts();
    this.getDungeons();
    setTimeout(() => {this.matchItems(this.dungeons);}, 2000);
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
      console.log(this.mounts);
    })
  }

  getDungeonDetails(id: number): void {
    this.httpService
      .getDungeonsDetails(id)
      .subscribe((details: DungeonDetails) => {
        console.log(details)
        return details;
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
  }
}
