import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftCalendarComponent } from './shift-calendar.component';

const routes: Routes = [
  {
    path:"",
    component:ShiftCalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftCalendarRoutingModule { }
