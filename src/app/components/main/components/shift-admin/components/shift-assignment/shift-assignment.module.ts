import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftAssignmentRoutingModule } from './shift-assignment-routing.module';
import { ShiftAssignmentComponent } from './shift-assignment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShiftAssignmentComponent
  ],
  imports: [
    CommonModule,
    ShiftAssignmentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShiftAssignmentModule { }
