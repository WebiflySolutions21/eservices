import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalComponent } from './medical.component';

const routes: Routes = [
  {
    path:"",
    component:MedicalComponent,
    children:[
      {
        path:'medical-dashboard',
        loadChildren: () => import('./components/medical-dashboard/medical-dashboard.module').then(m => m.MedicalDashboardModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRoutingModule { }
