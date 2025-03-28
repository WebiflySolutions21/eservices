import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewTableComponent } from './review-table.component';

const routes: Routes = [
  {
    path:"",
    component:ReviewTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewTableRoutingModule { }
