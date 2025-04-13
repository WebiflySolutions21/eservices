import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ADMIN_ROUTES,
  ADMIN_TABLE_COLUMNS,
  ADMIN_TABLE_DATA,
} from '@assets/constants/admin-routes.constants';
import { RegistrationService } from 'src/app/core/services';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  adminRoutes = ADMIN_ROUTES;
  hospitalName = 'Hospital Name';
  tableCategories = Object.keys(ADMIN_TABLE_DATA); // ['doctor', 'staff', 'receptionist']
  tableData: any;
  tableColumns = ADMIN_TABLE_COLUMNS;
  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.getRegisteredUsers();
  }

  getRegisteredUsers() {
    this.registrationService.getAll().subscribe({
      next: (res: any) => {
        this.tableData = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  handleAction(event: { action: string; row: any }) {
    switch (event?.action) {
      case 'edit':
        // Handle edit action
        this.updateData(event.row);
        console.log('Edit action triggered for row:', event.row);
        break;
      case 'delete':
        // Handle delete action
        this.deleteData(event.row);
        console.log('Delete action triggered for row:', event.row);
        break;
    }
    console.log(`${event.action} clicked for`, event.row);
  }

  updateData(data: any) {
    // Implement your logic to update the data here
    console.log('Update data for row:', data);
  }

  deleteData(data: any) {
    // Implement your logic to delete the data here
    console.log('Delete data for row:', data);
  }
}
