import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../core/services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { OrdersModalComponent } from '../orders-modal/orders-modal.component';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, DatePipe } from '@angular/common'; // <-- Añadir esto
import { NewOrderModalComponent } from '../new-order/new-order.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatInputModule,
    DatePipe, // <-- Pipe de fechas
  ],
  templateUrl: './customers.component.html',
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = [
    'customerName',
    'lastOrderDate',
    'nextPredictedOrderDate',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  totalItems = 0;
  pageSize = 10;
  currentSearch = ''; // <-- Variable para almacenar el filtro actual

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadData(1, '');
  }

  loadData(page: number, search: string) {
    this.currentSearch = search;

    this.customerService.getCustomers(search).subscribe((customers) => {
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.loadData(1, filterValue);
  }

  onPageChange(event: any) {
    const page = event.pageIndex + 1;
    this.loadData(page, this.currentSearch);
  }

  openOrders(customer: any) {
    this.dialog.open(OrdersModalComponent, {
      width: '60vw',
      maxWidth: 'none',
      data: { customerId: customer.customerId },
    });
  }

  openNewOrder(customer: any) {
    this.dialog
      .open(NewOrderModalComponent, {
        width: '900px',
        maxWidth: 'none',
        data: { customerId: customer.customerId },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadData(1, '');
        }
      });
  }
}
