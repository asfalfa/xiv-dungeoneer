import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public servers !: Array<string>;
  selected = 'char';
  
  constructor(
    private router: Router,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getServers();
  }
  getServers(): void{
    this.httpService
    .getServers()
    .subscribe((servers: Array<string>) => {
      this.servers = servers;
    });
  }
  onSubmit(form: NgForm) {
    this.httpService.p = 1;
    if(form.value.search && form.value.server){
      this.router.navigate(['search', form.value.search, form.value.server])
    } else if (form.value.search) {
      this.router.navigate(['search', form.value.search])
    } 
  }
}
