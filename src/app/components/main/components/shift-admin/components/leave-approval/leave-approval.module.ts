import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveApprovalRoutingModule } from './leave-approval-routing.module';
import { LeaveApprovalComponent } from './leave-approval.component';


@NgModule({
  declarations: [
    LeaveApprovalComponent
  ],
  imports: [
    CommonModule,
    LeaveApprovalRoutingModule
  ]
})
export class LeaveApprovalModule { }
