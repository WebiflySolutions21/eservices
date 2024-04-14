import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentDashboardRoutingModule } from './agent-dashboard-routing.module';
import { AgentDashboardComponent } from './agent-dashboard.component';


@NgModule({
  declarations: [
    AgentDashboardComponent
  ],
  imports: [
    CommonModule,
    AgentDashboardRoutingModule
  ]
})
export class AgentDashboardModule { }
