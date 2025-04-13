import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path:"",
    component:AdminComponent,
    children:[
      {
        path:'admin-dashboard',
        loadChildren: () => import('./components/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) 
      },
      {
        path:'registration',
        loadChildren: () => import('./components/registration/registration.module').then(m => m.RegistrationModule) 
      },
      {
        path:'titles',
        loadChildren: () => import('./components/titles/titles.module').then(m => m.TitlesModule) 
      },
      {
        path:'deleted-data',
        loadChildren: () => import('./components/deleted-data/deleted-data.module').then(m => m.DeletedDataModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
