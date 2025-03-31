import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionDashboardComponent } from './reception-dashboard.component';

const routes: Routes = [
  {
    path:"",
    component:ReceptionDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionDashboardRoutingModule { }
