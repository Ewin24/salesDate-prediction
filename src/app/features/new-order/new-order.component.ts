import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-order-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
  ],
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderModalComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<NewOrderModalComponent>);
  public data = inject<{ customerId: number }>(MAT_DIALOG_DATA);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  // Listas para los dropdowns
  employees: any[] = [];
  shippers: any[] = [];
  products: any[] = [];

  orderForm = this.fb.group({
    employeeId: [null, Validators.required],
    shipperId: [null, Validators.required],
    shipName: ['', Validators.required],
    shipAddress: ['', Validators.required],
    shipCity: ['', Validators.required],
    shipCountry: ['', Validators.required],
    orderDate: [null, Validators.required],
    requiredDate: [null, Validators.required],
    shippedDate: [null, Validators.required],
    freight: [0, Validators.required],
    orderDetails: this.fb.group({
      productId: [null, Validators.required],
      unitPrice: [0, Validators.required],
      quantity: [1, Validators.required],
      discount: [0, Validators.required],
    }),
  });

  orderDetailForm = this.fb.group({
    productId: [null, Validators.required],
    unitPrice: [0, [Validators.required, Validators.min(0)]],
    quantity: [1, [Validators.required, Validators.min(1)]],
    discount: [
      0,
      [Validators.required, Validators.min(0), Validators.max(100)],
    ],
  });

  ngOnInit(): void {
    // Cargar combos
    this.loadEmployees();
    this.loadShippers();
    this.loadProducts();
  }

  loadEmployees() {
    this.http
      .get<any[]>('http://localhost:5131/api/Employees')
      .subscribe((res) => (this.employees = res));
  }

  loadShippers() {
    this.http
      .get<any[]>('http://localhost:5131/api/Shippers')
      .subscribe((res) => (this.shippers = res));
  }

  loadProducts() {
    this.http
      .get<any[]>('http://localhost:5131/api/Products')
      .subscribe((res) => (this.products = res.filter((p) => !p.discontinued)));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateUnitPrice() {
    const productId = this.orderForm.get('orderDetails.productId')?.value;
    const selectedProduct = this.products.find(
      (p) => p.productId === productId
    );

    if (selectedProduct) {
      this.orderForm
        .get('orderDetails.unitPrice')
        ?.setValue(selectedProduct.unitPrice);
    }
  }

  saveOrder(): void {
    if (this.orderForm.invalid) {
      this.markFormGroupTouched(this.orderForm);
      return;
    }

    const formValue = this.orderForm.value;
    const payload = {
      customerId: this.data.customerId,
      employeeId: Number(formValue.employeeId),
      shipperId: Number(formValue.shipperId),
      shipName: formValue.shipName,
      shipAddress: formValue.shipAddress,
      shipCity: formValue.shipCity,
      shipCountry: formValue.shipCountry,
      orderDate: this.formatDate(formValue.orderDate),
      requiredDate: this.formatDate(formValue.requiredDate),
      shippedDate: this.formatDate(formValue.shippedDate),
      freight: Number(formValue.freight),
      productId: Number(formValue.orderDetails?.productId),
      unitPrice: Number(formValue.orderDetails?.unitPrice),
      quantity: Number(formValue.orderDetails?.quantity),
      discount: Number(formValue.orderDetails?.discount),
    };

    this.http.post('http://localhost:5131/api/Orders', payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error:', err),
    });
  }

  private formatDate(date: any): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }

  private markFormGroupTouched(formGroup: any) {
    Object.values(formGroup.controls).forEach((control) => {
      const abstractControl = control as AbstractControl;
      abstractControl.markAsTouched();
      if ((abstractControl as any).controls)
        this.markFormGroupTouched(abstractControl);
    });
  }
}
