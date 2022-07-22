import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character, Pagination, XIVAPIResponse } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public characters!: Array<Character>;
  public pagination!: Pagination;
  public itemSub !: Subscription;
  public routeSub !: Subscription;

  constructor( 
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
        if (params['search'] && params['server']){
          this.getCharacter(params['search'], params['server']);
        } else if (params['search']) {
          this.getCharacter(params['search']);
        } else if (params['server']){
          this.getCharacter(undefined, params['server']);
        }
    });
  }
  
  openDetails(id: number): void {
    this.router.navigate(['details', id]);
  }

  getCharacter(name?: string, server?: string): void {
    this.itemSub = this.httpService
      .getCharacter(name, server)
      .subscribe((itemList: XIVAPIResponse<Character>) => {
        this.characters = itemList.Results;
      });
  }
}
