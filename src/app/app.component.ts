import { Component } from '@angular/core';
import { CustomersComponent } from './features/customers/customers.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="p-4 min-h-screen bg-gray-50">
      <h1 class="text-2xl font-bold mb-4 text-blue-600">Sales Predictions</h1>
      <app-customers></app-customers>
    </div>
  `,
  imports: [CustomersComponent],
})
export class AppComponent {
  title = 'sales-predictions';
}
