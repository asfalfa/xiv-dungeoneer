import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  constructor(
    public httpService: HttpService,
    public searchComponent: SearchComponent,
  ) { }

  ngOnInit(): void {
  }

  pageChangeFirst(){
    this.httpService.pagination();
    this.searchComponent.ngOnInit();
  }
  pageChangeLast(page: number){
    this.httpService.pagination(undefined, page);
    this.searchComponent.ngOnInit();
  }
  pageChangePrevious(){
    this.httpService.pagination('down');
    this.searchComponent.ngOnInit();
  }

  pageChangeNext(){
    this.httpService.pagination('up');
    this.searchComponent.ngOnInit();
  }

  pageChangeUpDown(count: number){
    this.httpService.pagination(undefined, undefined, count);
    this.searchComponent.ngOnInit();
  }
}
