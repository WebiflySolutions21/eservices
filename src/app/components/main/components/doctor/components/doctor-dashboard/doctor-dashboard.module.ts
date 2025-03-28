import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorDashboardRoutingModule } from './doctor-dashboard-routing.module';
import { DoctorDashboardComponent } from './doctor-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrescriptionViewComponent } from './components/prescription-view/prescription-view.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { PrintPrescriptionComponent } from './components/prescription-view/components/print-prescription/print-prescription.component';


@NgModule({
  declarations: [
    DoctorDashboardComponent,
    PrescriptionViewComponent,
    PrintPrescriptionComponent
  ],
  imports: [
    CommonModule,
    DoctorDashboardRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class DoctorDashboardModule { }
