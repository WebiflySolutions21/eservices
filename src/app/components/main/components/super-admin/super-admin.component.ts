import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SUPER_ADMIN_ROUTES, SUPER_ADMIN_VIEW_ROUTES } from '@assets/constants/super-admin.constants';
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent {
superAdminRoutes = SUPER_ADMIN_ROUTES;
  hospitalName = "Hospital Name"
  loginDetails = {
   name : "Lokesh Thakare",
   imageUrl:"assets/images/header/doctor.jpeg",
   designation:"Doctor",
   contactNo:"1234567890",
   type:"Orthopedic",
  }
 constructor(private router:Router){}
 
 ngOnInit() {
  this.router.events.subscribe(() => {
    const currentUrl = this.router.url;

    // Check if the URL contains either "opd-bill" or "ipd-bill"
    if (/hospital-registration|configurations/.test(currentUrl)) {
      this.superAdminRoutes = SUPER_ADMIN_VIEW_ROUTES;
    } else {
      this.superAdminRoutes = SUPER_ADMIN_ROUTES;
    }
  });
}

 
   navigateUser(data) {
     this.router.navigate([`/main/super-admin/${data?.path}`])
 
     console.log(data);
   }
 
}
