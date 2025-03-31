import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionDashboardRoutingModule } from './reception-dashboard-routing.module';
import { ReceptionDashboardComponent } from './reception-dashboard.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ReceptionDashboardComponent
  ],
  imports: [
    CommonModule,
    ReceptionDashboardRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ReceptionDashboardModule { }
