import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdBillComponent } from './opd-bill.component';

const routes: Routes = [
  {
    path:"",
    component:OpdBillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdBillRoutingModule { }
