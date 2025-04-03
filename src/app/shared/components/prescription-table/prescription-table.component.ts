import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-prescription-table',
  templateUrl: './prescription-table.component.html',
  styleUrls: ['./prescription-table.component.scss'],
})
export class PrescriptionTableComponent {
  isPrintEnabled: boolean = true;
  @Output() prescriptionUpdated = new EventEmitter<any[]>();
  isRecording: boolean = false;
  recognition: any;
  idleTimeout: any;

  tableHeaders: string[] = [
    'Types', 'Medicine', 'सकाळ', 'दुपार', 'रात्र', 'कधी घ्यायचा', 'किती दिवस', 'Qty'
  ];

  medicineTypes: string[] = ['Tab', 'Syrup', 'Injection', 'E/D'];
  intakeTimes: string[] = ['जेवणानंतर', 'जेवणापूर्वी', '3 times'];

  medicineHistory = [
    { medicine: 'Zerodol P', morning: 1, afternoon: 0, night: 1, intakeTime: 'जेवणानंतर', days: 5, quantity: 10 },
    { medicine: 'Crocin', morning: 1, afternoon: 0, night: 1, intakeTime: 'जेवणानंतर', days: 5, quantity: 10 },
    { medicine: 'Zincovit', morning: 1, afternoon: 1, night: 0, intakeTime: 'जेवणानंतर', days: 7, quantity: 14 },
  ];

  prescriptionData = [
    { type: 'Tab', medicine: '', morning: 0, afternoon: 0, night: 0, intakeTime: 'जेवणानंतर', days: '', quantity: '', filteredMedicines: [] },
  ];

  addRow() {
    this.prescriptionData.push({
      type: '',
      medicine: '',
      morning: 0,
      afternoon: 0,
      night: 0,
      intakeTime: '',
      days: '',
      quantity: '',
      filteredMedicines: [],
    });
    this.emitPrescriptionData();
  }

  

  removeRow(index: number) {
    this.prescriptionData.splice(index, 1);
    this.emitPrescriptionData();
  }

  filterMedicineSuggestions(row: any) {
    const search = row.medicine.toLowerCase();
    if (search) {
      row.filteredMedicines = this.medicineHistory.filter(med =>
        med.medicine.toLowerCase().startsWith(search)
      );
    } else {
      row.filteredMedicines = [];
    }
  }

  selectMedicine(row: any, selectedMedicine: any) {
    row.medicine = selectedMedicine.medicine;
    row.morning = selectedMedicine.morning;
    row.afternoon = selectedMedicine.afternoon;
    row.night = selectedMedicine.night;
    row.intakeTime = selectedMedicine.intakeTime;
    row.days = selectedMedicine.days;
    row.quantity = selectedMedicine.quantity;
    row.filteredMedicines = [];
    this.emitPrescriptionData();
  }

  emitPrescriptionData() {
    this.prescriptionUpdated.emit(this.prescriptionData);
  }
}
