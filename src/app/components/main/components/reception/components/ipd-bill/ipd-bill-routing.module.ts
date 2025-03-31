import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpdBillComponent } from './ipd-bill.component';

const routes: Routes = [
  {
    path:"",
    component:IpdBillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpdBillRoutingModule { }
