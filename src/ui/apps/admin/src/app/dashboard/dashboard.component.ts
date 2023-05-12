import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppEvent, DashboardStore } from './dashboard.store';

@Component({
  selector: 'ppo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardStore],
})
export class DashboardComponent implements AfterViewInit {
  constructor(private store: DashboardStore) { }
  displayedColumns = ['type', 'timestamp', 'payload'];
  dataSource: MatTableDataSource<AppEvent> = new MatTableDataSource(
    [] as AppEvent[]
  );
  pagination$ = this.store.pagination$;
  tableReady$ = this.store.tableReady$;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.store.events$.subscribe((events) => {
      this.dataSource = new MatTableDataSource(events);
    });
  }
  applyFilter(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.dataSource.filter = term.trim().toLowerCase();
    this.store.updateTerm(term);
  }
  changePage(event: PageEvent): void {
    console.log(event);
    this.store.changePagination({ page: event.pageIndex, pageSize: event.pageSize });
  }
}
