import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintPrescriptionRoutingModule } from './print-prescription-routing.module';
import { PrintPrescriptionComponent } from './print-prescription.component';
import { SharedModule } from "../../../../../../../../../../shared/shared.module";


@NgModule({
  declarations: [
    PrintPrescriptionComponent
  ],
  imports: [
    CommonModule,
    PrintPrescriptionRoutingModule,
    SharedModule
]
})
export class PrintPrescriptionModule { }
