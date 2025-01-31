import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'https://localhost:7053/api/Orders';

  constructor(private http: HttpClient) {}

  getOrdersByCustomerId(customerId: number | string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/OrdersByCustomerId/${customerId}`);
  }
}
