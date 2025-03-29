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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
