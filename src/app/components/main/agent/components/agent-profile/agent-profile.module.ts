import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentProfileRoutingModule } from './agent-profile-routing.module';
import { AgentProfileComponent } from './agent-profile.component';


@NgModule({
  declarations: [
    AgentProfileComponent
  ],
  imports: [
    CommonModule,
    AgentProfileRoutingModule
  ]
})
export class AgentProfileModule { }
