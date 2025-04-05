import { Component, OnInit } from '@angular/core';
import { PATIENT_DETAILS } from '@assets/constants/doctor.constants';

@Component({
  selector: 'app-print-prescription',
  templateUrl: './print-prescription.component.html',
  styleUrls: ['./print-prescription.component.scss']
})
export class PrintPrescriptionComponent {
  patientDetails = PATIENT_DETAILS;

  data = {
    followupDate: "2025-03-30",
    followupDay: "Sunday",
    isAdmitted: true,
    referDoctor: null,
    prescriptionData: [
      { type: "Tab", medicine: "Rerum aut sed dolori", morning: 42, afternoon: 68, night: 49, intakeTime: "Before Meal", days: 92, quantity: 77 },
      { type: "Injection", medicine: "Architecto culpa es", morning: 53, afternoon: 98, night: 65, intakeTime: "After Meal", days: 91, quantity: 45 },
      { type: "Tab", medicine: "Rerum aut sed dolori", morning: 42, afternoon: 68, night: 49, intakeTime: "Before Meal", days: 92, quantity: 77 },
      { type: "Injection", medicine: "Architecto culpa es", morning: 53, afternoon: 98, night: 65, intakeTime: "After Meal", days: 91, quantity: 45 },
      { type: "Tab", medicine: "Rerum aut sed dolori", morning: 42, afternoon: 68, night: 49, intakeTime: "Before Meal", days: 92, quantity: 77 },
      { type: "Injection", medicine: "Architecto culpa es", morning: 53, afternoon: 98, night: 65, intakeTime: "After Meal", days: 91, quantity: 45 },
      { type: "Tab", medicine: "Rerum aut sed dolori", morning: 42, afternoon: 68, night: 49, intakeTime: "Before Meal", days: 92, quantity: 77 },
      { type: "Injection", medicine: "Architecto culpa es", morning: 53, afternoon: 98, night: 65, intakeTime: "After Meal", days: 91, quantity: 45 },
    ],
    selectedCheckboxes: [
      { "Examination": [{ "id": 1, "name": "Est laboriosam sit" }], "isPrintable": true },
      { "Family/Drug History": [{ "id": 4, "name": "Et excepteur ullam v" }], "isPrintable": true },
      { "Medical History": [{ "id": 6, "name": "Aut ullamco placeat" }], "isPrintable": true },
      { "Examination": [{ "id": 1, "name": "Est laboriosam sit" }], "isPrintable": true },
      { "Family/Drug History": [{ "id": 4, "name": "Et excepteur ullam v" }], "isPrintable": true },
      { "Medical History": [{ "id": 6, "name": "Aut ullamco placeat" }], "isPrintable": true },
      { "Examination": [{ "id": 1, "name": "Est laboriosam sit" }], "isPrintable": true },
      { "Family/Drug History": [{ "id": 4, "name": "Et excepteur ullam v" }], "isPrintable": true },
      { "Medical History": [{ "id": 6, "name": "Aut ullamco placeat" }], "isPrintable": true },
      { "Examination": [{ "id": 1, "name": "Est laboriosam sit" }], "isPrintable": true },
      { "Family/Drug History": [{ "id": 4, "name": "Et excepteur ullam v" }], "isPrintable": true },
      { "Medical History": [{ "id": 6, "name": "Aut ullamco placeat" }], "isPrintable": true }
    ]
  };

  getSectionTitle(section: any): string {
    return Object.keys(section).find(key => key !== 'isPrintable') || '';
  }

  getSectionData(section: any): any[] {
    const title = this.getSectionTitle(section);
    return section[title] || [];
  }

  printPage() {
    window.print();
  }
}
