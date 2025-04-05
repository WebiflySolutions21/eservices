import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftHistoryRoutingModule } from './shift-history-routing.module';
import { ShiftHistoryComponent } from './shift-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShiftHistoryComponent
  ],
  imports: [
    CommonModule,
    ShiftHistoryRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ShiftHistoryModule { }
