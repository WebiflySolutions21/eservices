import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DOCTOR_ROUTES,PRESCRIPTION_VIEW_ROUTES } from '@assets/constants/doctor.constants';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {
 doctorRoutes = DOCTOR_ROUTES
 hospitalName = "Hospital Name"

constructor(private router:Router){}

ngOnInit() {
  this.router.events.subscribe(() => {
    const currentUrl = this.router.url;

    if (currentUrl.includes("prescription-view")) {
      // If inside prescription-view, show different header content
      this.doctorRoutes = PRESCRIPTION_VIEW_ROUTES;
    } else {
      this.doctorRoutes = DOCTOR_ROUTES;
    }
  });
}

  navigateUser(data) {
    this.router.navigate([`/main/doctor/${data?.path}`])

    console.log(data);
  }

}
