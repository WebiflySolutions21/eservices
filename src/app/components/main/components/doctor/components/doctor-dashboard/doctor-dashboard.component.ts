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
  globalSearchTerm = ''; // Global search input
  filteredTableData: any = {};

  constructor(private router: Router) {
    this.filteredTableData = { ...this.tableData };
  }

  // Filter data based on global search term
  clearSearch() {
    this.globalSearchTerm = '';
    this.filterData();
  }


  

  filterData() {
    const searchTerm = this.globalSearchTerm.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredTableData = { ...this.tableData };
      return;
    }

    this.filteredTableData = {};

    for (const category of this.tableCategories) {
      this.filteredTableData[category] = this.tableData[category].filter(
        (item: any) => {
          const patientName = item.patientName?.toString().toLowerCase() || '';
          const contactNo = item.contactNo?.toString().toLowerCase() || '';

          return (
            patientName.includes(searchTerm) || contactNo.includes(searchTerm)
          );
        }
      );
    }

    console.log('Filtered Data:', this.filteredTableData);
  }

  handleAction(event: { action: string; row: any }) {
    console.log(event);
    if (event.action === 'view') {
      this.router.navigate(['/main/doctor/doctor-dashboard/prescription-view']);
    } else if (event.action === 'opd') {
      this.router.navigate(['/main/reception/reception-dashboard']);
    }
    console.log(`${event.action} clicked for`, event.row);
  }
}
