import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';

interface UmbrellaHistory {
  id: number;
  status: string;
  owner_name: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(private historyService: HistoryService) {}

  statuses: UmbrellaHistory[] | undefined;

  ngOnInit() {
    this.getStatuses();
  }

  /**
   * 현재 우산들에 대한 상테를 가지고 온다.
   */
  getStatuses() {
    // TODO: add error handling
    this.historyService.getHistories().subscribe((data) => {
      this.statuses = data as UmbrellaHistory[];
    });
  }
}
