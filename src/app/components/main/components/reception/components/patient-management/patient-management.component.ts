import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PATIENT_MANAGEMENT_TABLE_DATA,
  PATIENT_MANAGEMENT_TABLE_COLUMNS,
} from '@assets/constants/patient-management.constants';

@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.scss'],
})
export class PatientManagementComponent implements OnInit {
  tableCategories = Object.keys(PATIENT_MANAGEMENT_TABLE_DATA);
  tableData = PATIENT_MANAGEMENT_TABLE_DATA;
  tableColumns = PATIENT_MANAGEMENT_TABLE_COLUMNS;
  filteredTableData: any = {};
  actionButtons: any;
  filterType = "Follow Up";

  constructor(private router: Router) {
    console.log("tableData",this.tableData)
    this.filteredTableData = { ...this.tableData };
    console.log(this.filteredTableData)
  }

  ngOnInit() {
    this.applyFilter();
  }
  
  changeFilter(event: any) {
    this.filterType = event.target.value;
    this.applyFilter();
  }
  
  applyFilter() {
    // Filter the data based on the selected filter type
    this.filteredTableData['patient'] = this.tableData['patient'].filter((ele) => ele.type === this.filterType);
  
    // Set the action buttons based on the filter type
    if (this.filterType === 'Appointment') {
      this.actionButtons = [
        { label: 'Approve', action: 'approve' },
        { label: 'Hold', action: 'hold', class: 'btn btn-success' },
        { label: 'Reject', action: 'reject', class: 'btn btn-danger' },
      ];
    } else if (this.filterType === 'Skip') {
      this.actionButtons = [
        { label: 'Undo', action: 'undo' },
        { label: 'Delete', action: 'delete', class: 'btn btn-danger' },
      ];
    } else {
      this.actionButtons = [
      
      ];
    }
  
    console.log("Filtered Data: ", this.filteredTableData);
  }

  handleAction(event: any) {}
}
