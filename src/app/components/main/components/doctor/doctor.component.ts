import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DOCTOR_IMAGE_GALLERY_ROUTES, DOCTOR_ROUTES,PRESCRIPTION_VIEW_ROUTES } from '@assets/constants/doctor.constants';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {
 doctorRoutes = DOCTOR_ROUTES
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

    if (currentUrl.includes("prescription-view")) {
      // If inside prescription-view or image-gallery, show different header content
      this.doctorRoutes = PRESCRIPTION_VIEW_ROUTES;
    } else if ( currentUrl.includes("image-gallery") || currentUrl.includes("review-table")){
      this.doctorRoutes = DOCTOR_IMAGE_GALLERY_ROUTES
    }else {
      this.doctorRoutes = DOCTOR_ROUTES;
    }
    
  });
}

  navigateUser(data) {
    this.router.navigate([`/main/doctor/${data?.path}`])

    console.log(data);
  }

}
