import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IpdBillRoutingModule } from './ipd-bill-routing.module';
import { IpdBillComponent } from './ipd-bill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IpdBillComponent
  ],
  imports: [
    CommonModule,
    IpdBillRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IpdBillModule { }
