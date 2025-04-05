import { Component } from '@angular/core';
import { PATIENT_DETAILS } from '@assets/constants/doctor.constants';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent {
 patientDetails = PATIENT_DETAILS;
}
