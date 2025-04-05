import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  STAFF_TABLE_COLUMNS,
  STAFF_TABLE_DATA,
} from '@assets/constants/staff.constants';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss'],
})
export class StaffDashboardComponent {
  tableCategories = Object.keys(STAFF_TABLE_DATA); // ['doctor', 'staff', 'receptionist']
  tableData = STAFF_TABLE_DATA;
  tableColumns = STAFF_TABLE_COLUMNS;
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
    if (event.action === 'forms') {
      this.router.navigate(['/main/staff/forms'], {
        queryParams: { id: event.row.id },
      });
    }
    console.log(`${event.action} clicked for`, event.row);
  }
}
