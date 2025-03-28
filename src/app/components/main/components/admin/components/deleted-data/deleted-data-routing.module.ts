import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeletedDataComponent} from "./deleted-data.component"
const routes: Routes = [
  {
    path:"",
    component:DeletedDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeletedDataRoutingModule { }
