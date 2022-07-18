import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIResponse, Character, CharacterInfo, Dungeon, DungeonDetails, Minion, Mount, Orchestrion, XIVAPIResponse } from '../models';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public p: number = 1;

  constructor(private http: HttpClient) { }

  test(): Observable<any> {
    return this.http.get<any>(`/api/test`);
  }

  getMinions(): Observable<APIResponse<Minion>> {
    return this.http.get<APIResponse<Minion>>(`${env.COLLECTAPI}/minions`);
  }

  getMounts(): Observable<APIResponse<Mount>> {
    return this.http.get<APIResponse<Mount>>(`${env.COLLECTAPI}/mounts`);
  }

  getOrchestrions(): Observable<APIResponse<Orchestrion>> {
    return this.http.get<APIResponse<Orchestrion>>(`${env.COLLECTAPI}/orchestrions`);
  }

  getDungeons(): Observable<XIVAPIResponse<Dungeon>>{
    return this.http.get<XIVAPIResponse<Dungeon>>(`${env.XIVAPI}/InstanceContent?limit=87`);
  }

  getDungeonsDetails(id: Number): Observable<DungeonDetails>{
    return this.http.get<DungeonDetails>(`${env.XIVAPI}/InstanceContent/${id}`);
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
    let params = new HttpParams();
   
    params = new HttpParams().set('data', 'AC,FR,FC,MIMO,PVP').set('extended', '1');

    return this.http.get<CharacterInfo>(`${env.XIVAPI}/character/${id}`, {
      params: params,
    }); 
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
