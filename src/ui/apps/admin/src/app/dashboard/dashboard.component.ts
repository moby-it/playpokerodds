import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, map } from 'rxjs';
import { AppEvent, DashboardStore } from './dashboard.store';
import { format } from 'date-fns';
@Component({
  selector: 'ppo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardStore],
})
export class DashboardComponent implements AfterViewInit {
  constructor(private store: DashboardStore) {}
  stats$ = combineLatest([
    this.store.last24hRoundsPlayed$,
    this.store.last24hUsersLoggedIn$,
    this.store.last24hUsersRegistered$,
  ]).pipe(
    map((r) => ({
      roundsPlayed: r[0],
      usersLoggedIn: r[1],
      usersRegistered: r[2],
    }))
  );
  displayedColumns = ['type', 'timestamp', 'payload'];
  dataSource: MatTableDataSource<AppEvent> = new MatTableDataSource(
    [] as AppEvent[]
  );
  tableReady$ = this.store.tableReady$;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.store.events$.subscribe((events) => {
      this.dataSource = new MatTableDataSource(events);
      this.dataSource.filterPredicate = filterPredicate;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
function filterPredicate(data: AppEvent, filter: string): boolean {
  const date = format(new Date(data.timestamp),'MMMM dd yyyy hh mm ss SSSS XXXX').toLowerCase();

  return (
    data.type.toLowerCase().includes(filter) ||
    date.includes(filter) ||
    JSON.stringify(data.payload).toLowerCase().includes(filter)
  );
}
