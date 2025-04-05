import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveApplicationRoutingModule } from './leave-application-routing.module';
import { LeaveApplicationComponent } from './leave-application.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LeaveApplicationComponent
  ],
  imports: [
    CommonModule,
    LeaveApplicationRoutingModule,
    FormsModule
  ]
})
export class LeaveApplicationModule { }
