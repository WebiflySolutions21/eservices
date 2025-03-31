import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MEDICAL_VIEW_ROUTES } from '@assets/constants/medical.constants';
@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss'],
})
export class MedicalComponent {
  medicalRoutes: any;
  hospitalName = 'Hospital Name';
  loginDetails = {
    name: 'Lokesh Thakare',
    imageUrl: 'assets/images/header/doctor.jpeg',
    designation: 'Doctor',
    contactNo: '1234567890',
    type: 'Orthopedic',
  };
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;

      // Check if the URL contains either "opd-bill" or "ipd-bill"
      if (/medical-dashboard/.test(currentUrl)) {
        this.medicalRoutes = '';
      } else {
        this.medicalRoutes = MEDICAL_VIEW_ROUTES;
      }
    });
  }

  navigateUser(data) {
    this.router.navigate([`/main/medical/${data?.path}`]);

    console.log(data);
  }
}
