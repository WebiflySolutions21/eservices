import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintPrescriptionComponent } from './print-prescription.component';

const routes: Routes = [
  {
    path:"",
    component:PrintPrescriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintPrescriptionRoutingModule { }
