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
  statuses: { id: number, status: string }[] | undefined;

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
      { id: 1, status: '반납' },
      { id: 2, status: '반납' },
      { id: 3, status: '대출' },
      { id: 4, status: '반납' },
      { id: 5, status: '대출' },
      { id: 6, status: '반납' },
      { id: 7, status: '대출' },
      { id: 8, status: '반납' },
      { id: 9, status: '대출' },
      { id: 10, status: '반납' },
      { id: 11, status: '대출' },
      { id: 12, status: '반납' },
      { id: 13, status: '대출' },
      { id: 14, status: '반납' },
      { id: 15, status: '대출' },
      { id: 16, status: '반납' },
      { id: 17, status: '대출' },
      { id: 18, status: '반납' },
      { id: 19, status: '대출' },
      { id: 20, status: '반납' },
      { id: 21, status: '대출' },
      { id: 22, status: '반납' },
      { id: 23, status: '대출' },
      { id: 24, status: '반납' },
      { id: 25, status: '대출' },
      { id: 26, status: '반납' },
      { id: 27, status: '대출' },
      { id: 28, status: '대출' },
      { id: 29, status: '대출' },
      { id: 30, status: '대출' },
      { id: 31, status: '대출' },
      { id: 32, status: '반납' },
      { id: 33, status: '대출' },
      { id: 34, status: '반납' },
      { id: 35, status: '대출' },
      { id: 36, status: '반납' },
      { id: 37, status: '대출' },
      { id: 38, status: '반납' },
      { id: 39, status: '대출' },
      { id: 40, status: '반납' },
      { id: 41, status: '대출' },
      { id: 42, status: '반납' },
      { id: 43, status: '대출' },
      { id: 44, status: '반납' },
      { id: 45, status: '대출' },
      { id: 46, status: '반납' },
      { id: 47, status: '대출' },
      { id: 48, status: '반납' },
      { id: 49, status: '대출' },
      { id: 50, status: '반납' },
    ];
  }
}
