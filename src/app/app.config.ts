import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),

    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: { pageSizeOptions: [5, 10, 25, 100] },
    },
  ],
};
