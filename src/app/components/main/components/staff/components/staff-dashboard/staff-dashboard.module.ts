import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffDashboardRoutingModule } from './staff-dashboard-routing.module';
import { StaffDashboardComponent } from './staff-dashboard.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StaffDashboardComponent
  ],
  imports: [
    CommonModule,
    StaffDashboardRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class StaffDashboardModule { }
