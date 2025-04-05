import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftHistoryComponent } from './shift-history.component';

const routes: Routes = [
  {
    path:"",
    component:ShiftHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftHistoryRoutingModule { }
