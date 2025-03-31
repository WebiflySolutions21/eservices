import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrescriptionViewComponent } from './prescription-view.component';

const routes: Routes = [
  {
    path:"",
    component:PrescriptionViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionViewRoutingModule { }
