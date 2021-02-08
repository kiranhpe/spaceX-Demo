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

  allRockets: any[] = [];
  loading = true;
  search = "";
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
    this.rocketService
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

onKey(event:Event){
  console.log("dd")
  this.rockets = this.allRockets.filter(v => v.mission_name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
}
  getRockets() {
    this.loading = true;
    this.filterYear = null;
    this.land = "";
    this.launch = "";
    this.rocketService.getRockets().subscribe((data: any[]) => {
      this.allRockets = data;
      this.rockets = this.allRockets;
      this.loading = false;
    });
  }
}
