import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_ROUTES } from '@assets/constants/admin-routes.constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  adminRoutes = ADMIN_ROUTES
  hospitalName = "Hospital Name"
  constructor(private router:Router){}


  navigateUser(data) {
    this.router.navigate([`/main/admin/${data?.path}`])

    console.log(data);
  }
}
