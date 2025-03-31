import { Component } from '@angular/core';
import { LAB_TABLE_DATA, LAB_TABLE_COLUMNS} from '@assets/constants/lab.constants';

@Component({
  selector: 'app-lab-dashboard',
  templateUrl: './lab-dashboard.component.html',
  styleUrls: ['./lab-dashboard.component.scss']
})
export class LabDashboardComponent {
 tableCategories = Object.keys(LAB_TABLE_DATA); // ['doctor', 'staff', 'receptionist']
  tableData = LAB_TABLE_DATA;
  tableColumns = LAB_TABLE_COLUMNS;
  filteredTableData: any = {};

  constructor() {
    this.filteredTableData = { ...this.tableData };
  }
}
