import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent.component';

const routes: Routes = [
  {
    path:'',
    component:AgentComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./components/agent-dashboard/agent-dashboard.module').then(m => m.AgentDashboardModule) 
      },
      {
        path:'agent-dashboard',
        loadChildren: () => import('./components/agent-dashboard/agent-dashboard.module').then(m => m.AgentDashboardModule) 
      },
      {
        path:'agent-profile',
        loadChildren: () => import('./components/agent-profile/agent-profile.module').then(m => m.AgentProfileModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
