import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionViewRoutingModule } from './prescription-view-routing.module';
import { PrescriptionViewComponent } from './prescription-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrescriptionViewComponent
  ],
  imports: [
    CommonModule,
    PrescriptionViewRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PrescriptionViewModule { }
