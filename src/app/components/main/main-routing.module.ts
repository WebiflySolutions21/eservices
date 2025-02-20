import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
      },
      {
        path:'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
