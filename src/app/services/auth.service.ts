import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string): Observable<any> {
    let data = {
      username: username,
      email: email,
      password: password,
    };
    return this.http.post<any>(`${env.API}/signup`, data);
  }

  login(email: string, password: string): Observable<any> {
    let data = {
      email: email,
      password: password,
    };
    return this.http.post<any>(`${env.API}/signin`, data);
  }

}
