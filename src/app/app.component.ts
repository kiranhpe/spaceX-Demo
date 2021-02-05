import { Component, OnInit, VERSION } from "@angular/core";
import { SpaceX } from "./model/rocket";
import { RocketService } from "./rocket.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private rocketService: RocketService) {}

  name = "Kiran Nagaraj Reddy";

  allRockets: SpaceX[] = [];
  loading = true;

  year = null;

  years = Array(16)
    .fill(1)
    .map((x, i) => i + 2006);
  rockets: SpaceX[] = [];
  ngOnInit() {
    this.getRockets();
  }

  filter(year: number) {
    this.loading = true;
    this.year = year;
    this.rockets = this.allRockets.filter(x => x.launch_year == this.year);
    this.loading = false;
  }
  filterLaunchLand(launch: boolean, land: boolean) {
    this.loading = true;
    if (this.year == null) {
      this.rocketService
        .getLaunchAndLand(launch, land)
        .subscribe((data: SpaceX[]) => {
          this.rockets = data;
          this.loading = false;
        });
    } else {
      this.rocketService
        .getLaunchAndLandWithYear(launch, land, this.year)
        .subscribe((data: SpaceX[]) => {
          this.rockets = data;
          this.loading = false;
        });
    }
  }

  getRockets() {
    this.loading = true;

    this.rocketService.getRockets().subscribe((data: SpaceX[]) => {
      this.allRockets = data;
      this.rockets = this.allRockets;
      this.loading = false;
    });
  }
}
