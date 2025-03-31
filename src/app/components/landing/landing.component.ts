import { Component } from '@angular/core';
import { LOGIN_ROUTES } from '@assets/constants/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  loginRoutes = LOGIN_ROUTES;
  hospitalName = 'SIDDHIVINAYAK HOSPITAL';
  hospitalDescription = 'Medicare Hospital is dedicated to providing top-notch healthcare services with the latest technology and experienced medical professionals.';

  doctors = [
    { name: 'Dr. John Doe', specialty: 'Cardiologist', image: 'assets/doctors/doc1.jpg' },
    { name: 'Dr. Sarah Smith', specialty: 'Orthopedic Surgeon', image: 'assets/doctors/doc2.jpg' },
    { name: 'Dr. Emily Clark', specialty: 'Pediatrician', image: 'assets/doctors/doc3.jpg' },
    { name: 'Dr. Michael Brown', specialty: 'Neurologist', image: 'assets/doctors/doc4.jpg' },
  ];

  patientReviews = [
    { patient: 'Alex Johnson', message: 'Fantastic care and friendly staff!' },
    { patient: 'Priya Verma', message: 'Top-notch facilities and expert doctors.' },
    { patient: 'Samuel Lee', message: 'I felt very comfortable and well taken care of.' },
  ];

  facilities = [
    'Emergency Care',
    'OPD Services',
    'IPD Facilities',
    'Advanced Diagnostics',
    '24x7 Pharmacy',
    'Laboratory Services',
  ];
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
  navigateUser(data: any) {
    this.router.navigate([`/login`], {
      queryParams: { userId: data?.identification },
    });
  }
}
