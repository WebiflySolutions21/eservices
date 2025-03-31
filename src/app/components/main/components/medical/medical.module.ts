import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRoutingModule } from './medical-routing.module';
import { MedicalComponent } from './medical.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MedicalComponent
  ],
  imports: [
    CommonModule,
    MedicalRoutingModule,
    SharedModule
  ]
})
export class MedicalModule { }
