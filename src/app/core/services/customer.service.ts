import { Injectable } from '@angular/core';
import { Customer } from '../../shared/models/customer.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = 'https://localhost:7053/api/Customer';

  constructor(private http: HttpClient) {}

  getCustomers(search: string): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(this.apiUrl)
      .pipe(
        map((customers) =>
          customers.filter((c) =>
            c.customerName.toLowerCase().includes(search.toLowerCase())
          )
        )
      );
  }
}
