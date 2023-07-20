import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  // TODO: add logger
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  getHistories() {
    // return this.http.get(environment.api + "/history");
    return ["대출/반납기록"];
  }

  getHistory(id: number) {
    return this.http.get(environment.api + "/history/" + id);
    // return "대출/반납기록 상세";
  }
}
