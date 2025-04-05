import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveApprovalComponent } from './leave-approval.component';

const routes: Routes = [
  {
    path:"",
    component:LeaveApprovalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveApprovalRoutingModule { }
