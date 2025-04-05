import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftAdminRoutingModule } from './shift-admin-routing.module';
import { ShiftAdminComponent } from './shift-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShiftAssignmentComponent } from './components/shift-assignment/shift-assignment.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ShiftAdminComponent],
  imports: [
    CommonModule,
    ShiftAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    SharedModule
  ],
})
export class ShiftAdminModule {}
