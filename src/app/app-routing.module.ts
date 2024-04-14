import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/landing'
  },
  {
    path:'index.html',
    pathMatch:'full',
    redirectTo:'/landing'
  },
  {
    path:'landing',
    component:LandingComponent
  },
  {
    path:'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) 
  },
  {
    path:'main',
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
