import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftAssignmentComponent } from './shift-assignment.component';

const routes: Routes = [
  {
    path:"",
    component:ShiftAssignmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftAssignmentRoutingModule { }
