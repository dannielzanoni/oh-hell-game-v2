import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CreateGameResponse, CreateGameRequest } from '../models/lobby.model';

export class Lobby {
  constructor(private client: HttpClient, private router: Router) { }

  createGame(){
    const token = localStorage.getItem('JWT_TOKEN');

    //
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.client.post<CreateGameResponse>(`${environment.api_url}/lobby`, {}, { headers })
  }
}
