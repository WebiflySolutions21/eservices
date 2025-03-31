import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalDashboardRoutingModule } from './medical-dashboard-routing.module';
import { MedicalDashboardComponent } from './medical-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MedicalDashboardComponent
  ],
  imports: [
    CommonModule,
    MedicalDashboardRoutingModule,
    SharedModule
  ]
})
export class MedicalDashboardModule { }
