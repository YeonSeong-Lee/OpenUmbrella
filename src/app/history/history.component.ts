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
  statuses: { id: number, status: string, last_user: string }[] | undefined;

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
      { id: 1, status: '반납', last_user: 'seongyle' },
      { id: 2, status: '반납', last_user: 'seongyle' },
      { id: 3, status: '대출', last_user: 'seongyle' },
      { id: 4, status: '반납', last_user: 'seongyle' },
      { id: 5, status: '대출', last_user: 'seongyle' },
      { id: 6, status: '반납', last_user: 'seongyle' },
      { id: 7, status: '대출', last_user: 'seongyle' },
      { id: 8, status: '반납', last_user: 'seongyle' },
      { id: 9, status: '대출', last_user: 'seongyle' },
      { id: 10, status: '반납', last_user: 'seongyle' },
      { id: 11, status: '대출', last_user: 'seongyle' },
      { id: 12, status: '반납', last_user: 'seongyle' },
      { id: 13, status: '대출', last_user: 'seongyle' },
      { id: 14, status: '반납', last_user: 'seongyle' },
      { id: 15, status: '대출', last_user: 'seongyle' },
      { id: 16, status: '반납', last_user: 'seongyle' },
      { id: 17, status: '대출', last_user: 'seongyle' },
      { id: 18, status: '반납', last_user: 'seongyle' },
      { id: 19, status: '대출', last_user: 'seongyle' },
      { id: 20, status: '반납', last_user: 'seongyle' },
      { id: 21, status: '대출', last_user: 'seongyle' },
      { id: 22, status: '반납', last_user: 'seongyle' },
      { id: 23, status: '대출', last_user: 'seongyle' },
      { id: 24, status: '반납', last_user: 'seongyle' },
      { id: 25, status: '대출', last_user: 'seongyle' },
      { id: 26, status: '반납', last_user: 'seongyle' },
      { id: 27, status: '대출', last_user: 'seongyle' },
      { id: 28, status: '대출', last_user: 'seongyle' },
      { id: 29, status: '대출', last_user: 'seongyle' },
      { id: 30, status: '대출', last_user: 'seongyle' },
      { id: 31, status: '대출', last_user: 'seongyle' },
      { id: 32, status: '반납', last_user: 'seongyle' },
      { id: 33, status: '대출', last_user: 'seongyle' },
      { id: 34, status: '반납', last_user: 'seongyle' },
      { id: 35, status: '대출', last_user: 'seongyle' },
      { id: 36, status: '반납', last_user: 'seongyle' },
      { id: 37, status: '대출', last_user: 'seongyle' },
      { id: 38, status: '반납', last_user: 'seongyle' },
      { id: 39, status: '대출', last_user: 'seongyle' },
      { id: 40, status: '반납', last_user: 'seongyle' },
      { id: 41, status: '대출', last_user: 'seongyle' },
      { id: 42, status: '반납', last_user: 'seongyle' },
      { id: 43, status: '대출', last_user: 'seongyle' },
      { id: 44, status: '반납', last_user: 'seongyle' },
      { id: 45, status: '대출', last_user: 'seongyle' },
      { id: 46, status: '반납', last_user: 'seongyle' },
      { id: 47, status: '대출', last_user: 'seongyle' },
      { id: 48, status: '반납', last_user: 'seongyle' },
      { id: 49, status: '대출', last_user: 'seongyle' },
      { id: 50, status: '반납', last_user: 'seongyle' },
    ];
  }
}
