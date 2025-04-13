import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  RECEPTION_TABLE_COLUMNS,
  RECEPTION_TABLE_DATA,
} from '@assets/constants/reception.constants';
import { PatientService } from 'src/app/core/services';

@Component({
  selector: 'app-reception-dashboard',
  templateUrl: './reception-dashboard.component.html',
  styleUrls: ['./reception-dashboard.component.scss'],
})
export class ReceptionDashboardComponent implements OnInit {
  tableCategories = Object.keys(RECEPTION_TABLE_DATA); // ['doctor', 'staff', 'receptionist']
  tableColumns = RECEPTION_TABLE_COLUMNS;
  globalSearchTerm = ''; // Global search input
  filteredTableData: any;
  tableData:any
  constructor(private router: Router,private patientService: PatientService) {
  }

  ngOnInit(){
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientService.getPatients().subscribe({
      next: (res: any) => {
        this.filteredTableData = res;
        this.tableData = res;
        console.log(res)
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  

  // Filter data based on global search term
  clearSearch() {
    this.globalSearchTerm = '';
    this.filterData();
  }

  filterData() {
    const searchTerm = this.globalSearchTerm.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredTableData = this.tableData;
      return;
    }

    this.filteredTableData = {};

      this.filteredTableData= this.tableData.filter(
        (item: any) => {
          const patientName = item.patientName?.toString().toLowerCase() || '';
          const contactNo = item.contactNo?.toString().toLowerCase() || '';

          return (
            patientName.includes(searchTerm) || contactNo.includes(searchTerm)
          );
        }
      );

    console.log('Filtered Data:', this.filteredTableData);
  }

  handleAction(event: { action: string; row: any }) {
    console.log(event);
    if (event.action === 'opdBill') {
      this.router.navigate(['/main/reception/opd-bill']);
    }
    if(event.action === 'ipdBill'){
      this.router.navigate(['/main/reception/ipd-bill']);

    }
    
    console.log(`${event.action} clicked for`, event.row);
  }
}
