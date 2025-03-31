import { Component } from '@angular/core';
import {
  MEDICAL_TABLE_DATA,
  MEDICAL_TABLE_COLUMNS,
} from '@assets/constants/medical.constants';
@Component({
  selector: 'app-medical-dashboard',
  templateUrl: './medical-dashboard.component.html',
  styleUrls: ['./medical-dashboard.component.scss'],
})
export class MedicalDashboardComponent {
  tableCategories = Object.keys(MEDICAL_TABLE_DATA); // ['doctor', 'staff', 'receptionist']
  tableData = MEDICAL_TABLE_DATA;
  tableColumns = MEDICAL_TABLE_COLUMNS;
  filteredTableData: any = {};

  constructor() {
    this.filteredTableData = { ...this.tableData };
    console.log(this.filteredTableData)
  }
}
