import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIResponse, Dungeon, DungeonDetails, Minion, Mount, Orchestrion, XIVAPIResponse } from '../models';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

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

}
