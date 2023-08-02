import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  // TODO: add logger

  // set cors
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getHistories() {
    return this.http.get(environment.api + '/umbrellas/' + '?skip=0&limit=50', this.httpOptions);
  }

  getHistory(id: number) {
    return this.http.get(environment.api + '/umbrellas-history-id/' + id, this.httpOptions);
  }
}
