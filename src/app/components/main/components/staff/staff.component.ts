import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {STAFF_ROUTES} from '@assets/constants/staff.constants';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
staffRoutes = STAFF_ROUTES;
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
    this.staffRoutes = STAFF_ROUTES;

    // Check if the URL contains either "opd-bill" or "ipd-bill"
    // if (/opd-bill|ipd-bill|patient-registration|patient-management/.test(currentUrl)) {
    //   this.staffRoutes = RECEPTION_VIEW_ROUTES;
    // } else {
    // }
  });
}

 
   navigateUser(data) {
     this.router.navigate([`/main/staff/${data?.path}`])
 
     console.log(data);
   }
 
}
