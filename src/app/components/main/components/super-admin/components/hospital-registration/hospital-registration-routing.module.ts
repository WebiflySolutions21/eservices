import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalRegistrationComponent } from './hospital-registration.component';

const routes: Routes = [
  {
    path:'',
    component:HospitalRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRegistrationRoutingModule { }
