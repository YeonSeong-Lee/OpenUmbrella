import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryComponent } from "../history/history.component";
import { HistoryDetailComponent } from "./history-detail/history-detail.component";

@NgModule({
  declarations: [HistoryComponent, HistoryDetailComponent],
  imports: [CommonModule],
})
export class HistoryModule {}
