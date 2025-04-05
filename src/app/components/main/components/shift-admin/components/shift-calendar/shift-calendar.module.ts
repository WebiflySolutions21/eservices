import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftCalendarRoutingModule } from './shift-calendar-routing.module';
import { ShiftCalendarComponent } from './shift-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    ShiftCalendarComponent
  ],
  imports: [
    CommonModule,
    ShiftCalendarRoutingModule,
    FullCalendarModule
  ]
})
export class ShiftCalendarModule { }
