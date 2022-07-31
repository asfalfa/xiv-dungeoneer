import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIResponse, BlueMage } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-bluemage',
  templateUrl: './bluemage.component.html',
  styleUrls: ['./bluemage.component.css']
})
export class BluemageComponent implements OnInit, OnDestroy {

  public spells: Array<BlueMage> = [];

  private spellsSub !: Subscription;
  
  constructor(
    private httpService : HttpService,
  ) { }

  ngOnInit(): void {
    this.getBlueMage();
  }

  getBlueMage(): void {
    this.spellsSub = this.httpService
    .getBlueMage()
    .subscribe((spellsList: APIResponse<BlueMage>) => {
      this.spells = spellsList.results;
      console.log(this.spells);
    })
  }

  ngOnDestroy(): void {
      if (this.spellsSub){
      this.spellsSub.unsubscribe();
    }
  }

}
