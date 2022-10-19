import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BlueMage, Card, Character, CharacterInfo, Dungeon, Minion, Mount, Orchestrion, XIVAPIResponse } from '../models';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public p: number = 1;

  constructor(private http: HttpClient) { }

  getMinions(): Observable<Array<Minion>> {
    return this.http.get<Array<Minion>>(`${env.API}/minions`);
  }

  getMounts(): Observable<Array<Mount>> {
    return this.http.get<Array<Mount>>(`${env.API}/mounts`);
  }

  getOrchestrions(): Observable<Array<Orchestrion>> {
    return this.http.get<Array<Orchestrion>>(`${env.API}/orchestrions`);
  }

  getBlueMage(): Observable<Array<BlueMage>> {
    return this.http.get<Array<BlueMage>>(`${env.API}/spells`);
  }

  getCard(): Observable<Array<Card>> {
    return this.http.get<Array<Card>>(`${env.API}/cards`)
  }

  getDungeons(): Observable<Array<Dungeon>>{
    return this.http.get<Array<Dungeon>>(`${env.API}/dungeons`);
  }

  getCharacter(name?: string, server?: string){
    let params = new HttpParams();
    if (name && server){
      params = new HttpParams().set('name', `${name}`).set('server', `${server}`).set('page', this.p);
    } else if (name){
      params = new HttpParams().set('name', `${name}`).set('page', this.p);
    } else if (server){
      params = new HttpParams().set('server', `${server}`).set('page', this.p);
    } else {
      params = new HttpParams().set('name', 'Jasar').set('server', 'Phoenix').set('page', this.p);
    }

    return this.http.get<XIVAPIResponse<Character>>(`${env.XIVAPI}/character/search`, {
      params: params,
    }); 
  }

  getCharDetails(id: number){
    let data = {
      characterId: id,
    };
    return this.http.post<any>(`${env.API}/character`, data);
  }

  getServers(){
    return this.http.get<Array<string>>(`${env.XIVAPI}/servers`);
  }

  pagination(direction?: string, lastPage?: number, count?: number): void {
    if (direction == 'up'){
      this.p = this.p + 1;
      console.log(this.p);
    }
     else if (direction == 'down'){
      this.p = this.p - 1;
      if(this.p < 1){
        this.p = 1;
      }
      console.log(this.p);
    } else if (lastPage){
      this.p = lastPage;
    } else if (count){
      this.p = this.p + count;
    } else {
      this.p = 1;
    }
  }
}
