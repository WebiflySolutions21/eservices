import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftConfigRoutingModule } from './shift-config-routing.module';
import { ShiftConfigComponent } from './shift-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShiftConfigComponent
  ],
  imports: [
    CommonModule,
    ShiftConfigRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShiftConfigModule { }
