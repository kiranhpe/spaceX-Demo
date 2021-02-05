import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SpaceX } from "./model/rocket";

@Injectable()
export class RocketService {
  constructor(private http: HttpClient) {}

  readonly baseURL = "https://api.spacexdata.com/v3/launches?limit=100";

  getRockets(filter?: string) {
    return this.http.get<SpaceX[]>(this.baseURL + filter);
  }

  getLaunchSuccess() {
    return this.http.get(this.baseURL + "&launch_success=true");
  }

  getLaunchAndLand(launch: boolean, land: boolean) {
    return this.http.get(
      this.baseURL + "&launch_success=" + launch + "&land_success=" + land
    );
  }
  getLaunchAndLandWithYear(launch: boolean, land: boolean, year: number) {
    return this.http.get(
      this.baseURL +
        "&launch_success=" +
        launch +
        "&land_success=" +
        land +
        "&launch_year=" +
        year
    );
  }
}
