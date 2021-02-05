import { Component, OnInit, VERSION } from "@angular/core";
import { RocketService } from "./rocket.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private rocketService: RocketService) {}

  name = "Kiran Nagaraj Reddy";
  loading = true;
  years = Array(16)
    .fill(1)
    .map((x, i) => i + 2006);
  rockets: any = [];
  ngOnInit() {
    this.getRockets();
  }

  filter(year: number) {
    this.loading = true;

    this.rocketService
      .getLaunchAndLandWithYear(true, true, year)
      .subscribe(data => {
        this.rockets = data;
        this.loading = false;
      });
  }
  filterLaunchLand(launch: boolean, land: boolean) {
    this.loading = true;

    this.rocketService.getLaunchAndLand(launch, land).subscribe(data => {
      this.rockets = data;
      this.loading = false;
    });
  }

  getRockets() {
    this.loading = true;

    this.rocketService.getAllRockets().subscribe(data => {
      this.rockets = data;
      this.loading = false;
    });
  }
}
