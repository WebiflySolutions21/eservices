import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  DOCTOR_TABLE_COLUMNS,
  DOCTOR_TABLE_DATA,
} from '@assets/constants/doctor.constants';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent {
  tableCategories = Object.keys(DOCTOR_TABLE_DATA); // ['doctor', 'staff', 'receptionist']
  tableData = DOCTOR_TABLE_DATA;
  tableColumns = DOCTOR_TABLE_COLUMNS;
  constructor(private router: Router) {}

  handleAction(event: { action: string; row: any }) {
    console.log(event);
    if (event.action === 'view') {
      this.router.navigate(['/main/doctor/doctor-dashboard/prescription-view']);
    }
    console.log(`${event.action} clicked for`, event.row);
  }
}
