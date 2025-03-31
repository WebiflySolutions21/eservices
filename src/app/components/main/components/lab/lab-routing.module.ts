import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabComponent } from './lab.component';

const routes: Routes = [
  {
    path:"",
    component:LabComponent,
    children:[
      {
        path:'lab-dashboard',
        loadChildren: () => import('./components/lab-dashboard/lab-dashboard.module').then(m => m.LabDashboardModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }
