import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewTableRoutingModule } from './review-table-routing.module';
import { ReviewTableComponent } from './review-table.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ReviewTableComponent
  ],
  imports: [
    CommonModule,
    ReviewTableRoutingModule,
    SharedModule
  ]
})
export class ReviewTableModule { }
