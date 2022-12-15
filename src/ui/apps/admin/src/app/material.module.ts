import { NgModule } from '@angular/core';

import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
