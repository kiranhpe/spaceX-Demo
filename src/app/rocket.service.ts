import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class RocketService {
  constructor(private http: HttpClient) {}

  readonly baseURL = "https://api.spacexdata.com/v3/launches?limit=100";

  getAllRockets() {
    return this.http.get(this.baseURL);
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
