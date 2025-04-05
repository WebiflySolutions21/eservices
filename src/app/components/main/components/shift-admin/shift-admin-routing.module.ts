import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftAdminComponent } from './shift-admin.component';

const routes: Routes = [
  {
    path: '',
    component:ShiftAdminComponent,
    children:[
      {
        path: 'shift-config',
        loadChildren: () =>
          import('./components/shift-config/shift-config.module').then((m) => m.ShiftConfigModule),
      },
      {
        path: 'shift-assignment',
        loadChildren: () =>
          import('./components/shift-assignment/shift-assignment.module').then((m) => m.ShiftAssignmentModule),
      },
      {
        path: 'shift-calendar',
        loadChildren: () =>
          import('./components/shift-calendar/shift-calendar.module').then((m) => m.ShiftCalendarModule),
      },
      {
        path: 'shift-history',
        loadChildren: () =>
          import('./components/shift-history/shift-history.module').then((m) => m.ShiftHistoryModule),
      },
      {
        path: 'leave-config',
        loadChildren: () =>
          import('./components/leave-config/leave-config.module').then((m) => m.LeaveConfigModule),
      },
      {
        path: 'leave-application',
        loadChildren: () =>
          import('./components/leave-application/leave-application.module').then((m) => m.LeaveApplicationModule),
      },
      {
        path: 'leave-approval',
        loadChildren: () =>
          import('./components/leave-approval/leave-approval.module').then((m) => m.LeaveApprovalModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftAdminRoutingModule { }
