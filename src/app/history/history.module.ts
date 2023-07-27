import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HistoryComponent } from '../history/history.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [HistoryComponent, HistoryDetailComponent],
  imports: [CommonModule, RouterModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule],
})
export class HistoryModule {}
