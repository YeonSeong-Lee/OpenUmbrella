import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(private historyService: HistoryService) {}

  // TODO: Add a interface for umbrellaHistory
  statuses: any[] | undefined = ['대출', '반납'];

  ngOnInit() {
    this.getStatuses();
  }

  /**
   * 현재 우산들에 대한 상테를 가지고 온다.
   */
  getStatuses() {
    // TODO: add observable
    // this.historyService.getStatuses().subscribe((data: any) => {
    //   this.statuses = data;
    // });
    // TODO: remove this, this is for test
    this.statuses = [
      { id: 1, status: '대출' },
      { id: 2, status: '반납' },
    ];
  }
}
