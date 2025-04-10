import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_ROUTES, ADMIN_TABLE_COLUMNS, ADMIN_TABLE_DATA } from "@assets/constants/admin-routes.constants";
import { RegistrationService } from 'src/app/core/services';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  adminRoutes = ADMIN_ROUTES
  hospitalName = "Hospital Name"
  tableCategories = Object.keys(ADMIN_TABLE_DATA); // ['doctor', 'staff', 'receptionist']
  tableData = ADMIN_TABLE_DATA;
  tableColumns = ADMIN_TABLE_COLUMNS;
  registeredUsers:any;
  constructor(private registrationService:RegistrationService){}
ngOnInit(): void {
  this.registrationService.getAll().subscribe((res:any)=>{
    this.registeredUsers = res;
    // this.tableData = res
    console.log(this.registeredUsers);
  },(err:any)=>{
    console.log(err);
  });
}

  handleAction(event: { action: string; row: any }) {
    console.log(`${event.action} clicked for`, event.row);
  }
}
