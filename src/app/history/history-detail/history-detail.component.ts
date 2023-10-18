import { ViewChild, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../history.service';
import { ShareService } from 'src/app/share.service';

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
export class HistoryDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private historyService: HistoryService, private shareService: ShareService) { }

  umbrellaID: number | undefined;

  umbrellaDetailHistory: UmbrellaDeatailHistory[] = [];

  displayedColumns: string[] = ['user_name', 'borrowed_at', 'returned_at'];

  dataSource!: MatTableDataSource<UmbrellaDeatailHistory>;

  getUmbrellaHistory() {
    this.umbrellaID = Number(this.route.snapshot.paramMap.get('id'));
    this.historyService.getHistory(this.umbrellaID).subscribe((data) => {
      this.umbrellaDetailHistory = data as UmbrellaDeatailHistory[];
      this.umbrellaDetailHistory.forEach((element) => {
        element.borrowed_at = new Date(element.borrowed_at).toLocaleString('ko-KR');
        if (element.returned_at) {
          element.returned_at = new Date(element.returned_at).toLocaleString('ko-KR');
        }
      });
      this.dataSource = new MatTableDataSource(this.umbrellaDetailHistory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  async callApi() {
    await this.shareService.LendOrReturnUmbrella(Number(this.umbrellaID));
  }

  ngOnInit(): void {
    this.getUmbrellaHistory();
  }

  applyFilter(event: Event) {
    if (!this.dataSource) return;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
