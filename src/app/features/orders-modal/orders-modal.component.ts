// orders-modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-orders-modal',
  standalone: true,
  imports: [
    // Módulos que el template necesita
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './orders-modal.component.html',
  styleUrls: ['./orders-modal.component.scss'],
})
export class OrdersModalComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<OrdersModalComponent>);
  public data = inject<{ customerId: number }>(MAT_DIALOG_DATA);
  private orderService = inject(OrderService);

  displayedColumns: string[] = [
    'orderId',
    'orderDate',
    'requiredDate',
    'shippedDate',
    'shipName',
    'shipAddress',
    'shipCity',
    'shipCountry',
  ];
  dataSource = new MatTableDataSource<Order>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.orderService
      .getOrdersByCustomerId(this.data.customerId)
      .subscribe((orders: Order[]) => {
        this.dataSource.data = orders;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
