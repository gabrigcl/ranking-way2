import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'http://api.football-data.org/v2';

  getStandings(competitionId: number): Observable<any>{
    return this.http.get(this.baseUrl + '/competitions/' + competitionId + '/standings');
  }
}
