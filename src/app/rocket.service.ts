import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class RocketService {
  constructor(private http: HttpClient) {}

  readonly baseURL = "https://api.spacexdata.com/v3/launches?limit=100";

  getRockets() {
    return this.http.get(this.baseURL);
  }
  filter(launch: string, land: string, year: number) {
    var yearFiler = year === null ? "" : year;
    return this.http.get(
      this.baseURL +
        "&launch_success=" +
        launch +
        "&land_success=" +
        land +
        "&launch_year=" +
        yearFiler
    );
  }
}
