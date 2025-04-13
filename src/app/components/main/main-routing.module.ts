import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:'admin',
        loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) 
      },
      {
        path:'doctor',
        loadChildren: () => import('./components/doctor/doctor.module').then(m => m.DoctorModule) 
      },
      {
        path:'reception',
        loadChildren: () => import('./components/reception/reception.module').then(m => m.ReceptionModule) 
      },
      {
        path:'staff',
        loadChildren: () => import('./components/staff/staff.module').then(m => m.StaffModule) 
      },
      {
        path:'medical',
        loadChildren: () => import('./components/medical/medical.module').then(m => m.MedicalModule) 
      },
      {
        path:'lab',
        loadChildren: () => import('./components/lab/lab.module').then(m => m.LabModule) 
      },
      {
        path:'shift-admin',
        loadChildren: () => import('./components/shift-admin/shift-admin.module').then(m => m.ShiftAdminModule) 
      },
      {
        path:'super-admin',
        loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule) 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
