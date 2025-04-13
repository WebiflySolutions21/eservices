import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminDashboardRoutingModule } from './super-admin-dashboard-routing.module';
import { SuperAdminDashboardComponent } from './super-admin-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SuperAdminDashboardComponent
  ],
  imports: [
    CommonModule,
    SuperAdminDashboardRoutingModule,
    SharedModule
  ]
})
export class SuperAdminDashboardModule { }
