import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: 'staff-dashboard',
        loadChildren: () =>
          import('./components/staff-dashboard/staff-dashboard.module').then(
            (m) => m.StaffDashboardModule
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./components/forms/forms.module').then((m) => m.FormsModule),
      },
      {
        path: 'registers',
        loadChildren: () =>
          import('./components/registers/registers.module').then((m) => m.RegistersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
