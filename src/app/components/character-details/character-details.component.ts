import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CharacterInfo } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  itemId!: number;
  routeSub !: Subscription;
  charSub !: Subscription;
  character !: CharacterInfo;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: HttpService
    ) { }

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.itemId = params['id'];
      this.getCharDetails(this.itemId);
    })
  }

  getCharDetails(id: number): void {
    this.charSub = this.httpService
      .getCharDetails(id).subscribe((CharacterInfo: CharacterInfo) => {
        this.character = CharacterInfo;
      })
  }

  ngOnDestroy(): void{
    if (this.charSub){
      this.charSub.unsubscribe();
    }
    if (this.routeSub){
      this.routeSub.unsubscribe();
    }
  }
}
