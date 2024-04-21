import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/login'
  },
  {
    path:'login',
    pathMatch:'full',
    redirectTo:'/login'
  },
  {
    path:'index.html',
    pathMatch:'full',
    redirectTo:'/login'
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
