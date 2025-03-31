import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LAB_VIEW_ROUTES } from '@assets/constants/lab.constants';
@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
})
export class LabComponent {
  labRoutes: any;
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
      if (/lab-dashboard/.test(currentUrl)) {
        this.labRoutes = '';
      } else {
        this.labRoutes = LAB_VIEW_ROUTES;
      }
    });
  }

  navigateUser(data) {
    this.router.navigate([`/main/lab/${data?.path}`]);

    console.log(data);
  }
}
