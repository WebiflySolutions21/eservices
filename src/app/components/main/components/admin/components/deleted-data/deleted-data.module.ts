import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeletedDataRoutingModule } from './deleted-data-routing.module';
import { DeletedDataComponent } from './deleted-data.component';


@NgModule({
  declarations: [
    DeletedDataComponent
  ],
  imports: [
    CommonModule,
    DeletedDataRoutingModule
  ]
})
export class DeletedDataModule { }
