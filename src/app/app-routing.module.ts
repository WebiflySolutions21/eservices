import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenStatusComponent } from './components/token-status/token-status.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing',
  },
  {
    path: 'landing',
    pathMatch: 'full',
    redirectTo: '/landing',
  },
  {
    path: 'index.html',
    pathMatch: 'full',
    redirectTo: '/landing',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'token-status',
    component:TokenStatusComponent
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./components/landing/landing.module').then(
        (m) => m.LandingModule
      ),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./components/main/main.module').then((m) => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
