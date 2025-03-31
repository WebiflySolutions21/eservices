import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabDashboardRoutingModule } from './lab-dashboard-routing.module';
import { LabDashboardComponent } from './lab-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LabDashboardComponent
  ],
  imports: [
    CommonModule,
    LabDashboardRoutingModule,
    SharedModule
  ]
})
export class LabDashboardModule { }
