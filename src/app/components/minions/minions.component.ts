import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Minion } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-minions',
  templateUrl: './minions.component.html',
  styleUrls: ['./minions.component.css']
})
export class MinionsComponent implements OnInit, OnDestroy {
  public minions: Array<Minion> = [];
  private minionSub !: Subscription;

  constructor(
    private httpService : HttpService
  ) { }

  ngOnInit(): void {
    this.getMinions();
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

  ngOnDestroy(): void {
    if (this.minionSub){
      this.minionSub.unsubscribe();
    }
  }
}
