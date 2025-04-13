import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';

const routes: Routes = [
  {
    path: '',
    component:SuperAdminComponent,
    children:[
      {
        path:'super-admin-dashboard',
        loadChildren: () => import('./components/super-admin-dashboard/super-admin-dashboard.module').then(m => m.SuperAdminDashboardModule) 
      },
      {
        path:'hospital-registration',
        loadChildren: () => import('./components/hospital-registration/hospital-registration.module').then(m => m.HospitalRegistrationModule) 
      },
      {
        path:'configurations',
        loadChildren: () => import('./components/configurations/configurations.module').then(m => m.ConfigurationsModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
