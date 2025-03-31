import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';

const routes: Routes = [
  {
    path:"",
    component:DoctorComponent,
    children:[
      {
        path:'doctor-dashboard',
        loadChildren: () => import('./components/doctor-dashboard/doctor-dashboard.module').then(m => m.DoctorDashboardModule) 
      },
      {
        path:'review-table',
        loadChildren: () => import('./components/review-table/review-table.module').then(m => m.ReviewTableModule) 
      },
      {
        path:'image-gallery',
        loadChildren: () => import('./components/image-gallery/image-gallery.module').then(m => m.ImageGalleryModule) 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
