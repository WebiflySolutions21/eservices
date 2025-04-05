import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveConfigComponent } from './leave-config.component';

const routes: Routes = [
 {
  path:"",
  component:LeaveConfigComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveConfigRoutingModule { }
