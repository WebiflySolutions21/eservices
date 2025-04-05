import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss']
})
export class PrintPageComponent {
  paymentMethods: any[] = [];
  opdBills: any[] = [];
  billTitle:string
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as {
      paymentMethods: any[],
      opdBills: any[],
      billTitle:string
    };

    if (state) {
      this.paymentMethods = state.paymentMethods || [];
      this.opdBills = state.opdBills || [];
      this.billTitle = state.billTitle
    }
  }

  
  printPage() {
    window.print();
  }
}
