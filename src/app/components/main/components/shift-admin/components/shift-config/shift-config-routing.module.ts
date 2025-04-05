import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftConfigComponent } from './shift-config.component';

const routes: Routes = [
  {
    path:"",
    component:ShiftConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftConfigRoutingModule { }
