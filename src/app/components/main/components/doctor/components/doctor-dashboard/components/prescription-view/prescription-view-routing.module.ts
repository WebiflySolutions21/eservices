import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrescriptionViewComponent } from './prescription-view.component';

const routes: Routes = [
  {
    path:"",
    component:PrescriptionViewComponent,
  },
  {
    path: 'print-prescription',
    loadChildren: () => import('./components/print-prescription/print-prescription.module').then(m => m.PrintPrescriptionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionViewRoutingModule { }
