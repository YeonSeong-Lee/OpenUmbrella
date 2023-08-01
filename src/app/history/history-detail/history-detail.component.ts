import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

interface UmbrellaDeatailHistory {
  user_name: string;
  borrowed_at: string;
  returned_at: string | null;
}

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css'],
})
export class HistoryDetailComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute) {}

  umbrellaID: number | undefined;

  umbrellaDetailHistory: UmbrellaDeatailHistory[] = [];

  displayedColumns: string[] = ['user_name', 'borrowed_at', 'returned_at'];

  dataSource!: MatTableDataSource<UmbrellaDeatailHistory>;

  getUmbrellaHistory() {
    //TODO : get umbrella history by umbrellaID from server
    // TEST: mock data
    this.umbrellaDetailHistory = [
      {
        user_name: 'susong',
        borrowed_at: '2023-08-01T22:40:42',
        returned_at: '2023-08-01T22:43:30',
      },
      {
        user_name: 'susong',
        borrowed_at: '2023-08-01T22:51:01',
        returned_at: null,
      },
    ];
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.umbrellaID = Number(this.route.snapshot.paramMap.get('id'));
    this.getUmbrellaHistory();
    this.dataSource = new MatTableDataSource(this.umbrellaDetailHistory);
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
