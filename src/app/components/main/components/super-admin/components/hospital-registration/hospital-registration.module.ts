import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalRegistrationRoutingModule } from './hospital-registration-routing.module';
import { HospitalRegistrationComponent } from './hospital-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HospitalRegistrationComponent
  ],
  imports: [
    CommonModule,
    HospitalRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HospitalRegistrationModule { }
