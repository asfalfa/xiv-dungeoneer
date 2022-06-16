import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public minions !: Array<any>;

  constructor(
    private httpService : HttpService,
  ){}

  ngOnInit(): void {
    this.getMinions();
  }

  getMinions(): void {
    this.minions = this.httpService.getMinions();
    console.log(this.minions);
  }
}
