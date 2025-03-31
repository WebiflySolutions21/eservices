import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpdBillRoutingModule } from './opd-bill-routing.module';
import { OpdBillComponent } from './opd-bill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OpdBillComponent
  ],
  imports: [
    CommonModule,
    OpdBillRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OpdBillModule { }
