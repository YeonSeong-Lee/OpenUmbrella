import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
@Component({
  selector: "app-history-detail",
  templateUrl: "./history-detail.component.html",
  styleUrls: ["./history-detail.component.css"],
})
export class HistoryDetailComponent {
  constructor(private route: ActivatedRoute, location: Location) {}
  // TODO: Add a interface for umbrellaHistory
  umbrellaHistory: any | undefined;

  ngOnInit(): void {}
}
