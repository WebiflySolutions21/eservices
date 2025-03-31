import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorDashboardComponent,
  },
  {
    path: 'prescription-view',
    loadChildren: () => import('./components/prescription-view/prescription-view.module').then(m => m.PrescriptionViewModule),
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorDashboardRoutingModule { }
