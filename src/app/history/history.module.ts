import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HistoryComponent } from '../history/history.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [HistoryComponent, HistoryDetailComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class HistoryModule {}
