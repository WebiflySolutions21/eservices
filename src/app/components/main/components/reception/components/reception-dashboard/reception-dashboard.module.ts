import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionDashboardRoutingModule } from './reception-dashboard-routing.module';
import { ReceptionDashboardComponent } from './reception-dashboard.component';


@NgModule({
  declarations: [
    ReceptionDashboardComponent
  ],
  imports: [
    CommonModule,
    ReceptionDashboardRoutingModule
  ]
})
export class ReceptionDashboardModule { }
