import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DoctorComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
