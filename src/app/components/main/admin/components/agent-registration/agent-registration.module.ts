import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRegistrationRoutingModule } from './agent-registration-routing.module';
import { AgentRegistrationComponent } from './agent-registration.component';


@NgModule({
  declarations: [
    AgentRegistrationComponent
  ],
  imports: [
    CommonModule,
    AgentRegistrationRoutingModule
  ]
})
export class AgentRegistrationModule { }
