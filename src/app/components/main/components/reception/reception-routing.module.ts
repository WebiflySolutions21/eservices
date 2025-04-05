import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionComponent } from './reception.component';

const routes: Routes = [
  {
    path:"",
    component:ReceptionComponent,
    children:[
      {
        path:'reception-dashboard',
        loadChildren: () => import('./components/reception-dashboard/reception-dashboard.module').then(m => m.ReceptionDashboardModule) 
      },
      {
        path:'opd-bill',
        loadChildren: () => import('./components/opd-bill/opd-bill.module').then(m => m.OpdBillModule) 
      },
      {
        path:'ipd-bill',
        loadChildren: () => import('./components/ipd-bill/ipd-bill.module').then(m => m.IpdBillModule) 
      },
      {
        path:'patient-registration',
        loadChildren: () => import('./components/patient-registration/patient-registration.module').then(m => m.PatientRegistrationModule) 
      },
      {
        path:'patient-management',
        loadChildren: () => import('./components/patient-management/patient-management.module').then(m => m.PatientManagementModule) 
      },
      {
        path:'print-page',
        loadChildren: () => import('./components/print-page/print-page.module').then(m => m.PrintPageModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionRoutingModule {}
