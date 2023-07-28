import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

export interface UmbrellaHistory {
  name: string;
  date: Date;
  status: string;
}

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css'],
})
export class HistoryDetailComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute) {}

  // TODO: Add a interface for umbrellaHistory
  umbrellaID: number | undefined;

  umbrellaHistory: UmbrellaHistory[] = [];

  displayedColumns: string[] = ['name', 'date', 'status'];

  dataSource!: MatTableDataSource<UmbrellaHistory>;

  getUmbrellaHistory() {
    //TODO : get umbrella history by umbrellaID from server
    // TEST: mock data
    this.umbrellaHistory = [
      { name: 'seongyle', date: new Date(), status: '대출' },
      { name: 'susong', date: new Date(), status: '반납' },
      { name: 'jmaing', date: new Date(), status: '대출' },
      { name: 'seongyle', date: new Date(), status: '반납' },
      { name: 'susong', date: new Date(), status: '대출' },
      { name: 'jmaing', date: new Date(), status: '반납' },
      { name: 'seongyle', date: new Date(), status: '대출' },
      { name: 'susong', date: new Date(), status: '반납' },
    ];
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.umbrellaID = Number(this.route.snapshot.paramMap.get('id'));
    this.getUmbrellaHistory();
    this.dataSource = new MatTableDataSource(this.umbrellaHistory);
  }

  applyFilter(event: Event) {
    if (!this.dataSource) return;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  ngAfterViewInit() {
    if (!this.dataSource) return;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
