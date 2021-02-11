import { Component, OnDestroy, OnInit, VERSION } from "@angular/core";
import { Subscription } from "rxjs";
import { RocketService } from "./rocket.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private rocketService: RocketService) {}

  name = "Kiran Nagaraj Reddy";

  allRockets: any[] = [];
  loading = true;
  rocketFilterSub: Subscription;
  allRocketSub: Subscription;
  filterYear;
  land = "";
  launch = "";
  years = Array(16)
    .fill(1)
    .map((x, i) => i + 2006);
  rockets: any[] = [];
  ngOnInit() {
    this.getRockets();
  }

  filter(year: number) {
    this.loading = true;
    this.filterYear = year;
    this.rocketService
      .filter(this.launch, this.land, this.filterYear)
      .subscribe((data: any[]) => {
        this.rockets = data;
        this.loading = false;
      });
  }
  filterLaunch(launch: boolean) {
    this.loading = true;
    this.launch = launch.toString();
    this.rocketFilterSub = this.rocketService
      .filter(this.launch, this.land, this.filterYear)
      .subscribe((data: any[]) => {
        this.rockets = data;
        this.loading = false;
      });
  }

  filterLand(land: boolean) {
    this.loading = true;
    this.land = land.toString();
    this.rocketService
      .filter(this.launch, this.land, this.filterYear)
      .subscribe((data: any[]) => {
        this.rockets = data;
        this.loading = false;
      });
  }

  getRockets() {
    this.loading = true;
    this.filterYear = null;
    this.land = "";
    this.launch = "";
    this.allRocketSub = this.rocketService
      .getRockets()
      .subscribe((data: any[]) => {
        this.allRockets = data;
        this.rockets = this.allRockets;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.allRocketSub.unsubscribe();
    this.rocketFilterSub.unsubscribe();
  }
}
