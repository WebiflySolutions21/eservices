import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard.component';
import { PrescriptionViewComponent } from './components/prescription-view/prescription-view.component';
import { PrintPrescriptionComponent } from './components/prescription-view/components/print-prescription/print-prescription.component';

const routes: Routes = [
  {
    path:"",
    component:DoctorDashboardComponent
  },
  {
    path:"prescription-view",
    component:PrescriptionViewComponent
  },
  { path: 'print-prescription', component: PrintPrescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorDashboardRoutingModule { }
