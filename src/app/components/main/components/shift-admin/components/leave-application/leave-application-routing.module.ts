import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveApplicationComponent } from './leave-application.component';

const routes: Routes = [
  {
    path:"",
    component:LeaveApplicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveApplicationRoutingModule { }
