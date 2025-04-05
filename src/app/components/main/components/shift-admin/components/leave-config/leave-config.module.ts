import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveConfigRoutingModule } from './leave-config-routing.module';
import { LeaveConfigComponent } from './leave-config.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LeaveConfigComponent
  ],
  imports: [
    CommonModule,
    LeaveConfigRoutingModule,
    FormsModule
  ]
})
export class LeaveConfigModule { }
