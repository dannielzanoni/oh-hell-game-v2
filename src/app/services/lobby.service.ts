import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateGameResponse, CreateGameRequest } from '../models/lobby.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LobbyService {
  constructor(private client: HttpClient, private router: Router) { }

  createGame(request: CreateGameRequest){
      const token = localStorage.getItem('JWT_TOKEN');

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      return this.client.post<CreateGameResponse>(
        `${environment.api_url}/lobby`,
        request,
        { headers }
      );
  }
}
