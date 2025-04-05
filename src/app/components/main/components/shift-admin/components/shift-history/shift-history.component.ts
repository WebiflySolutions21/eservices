import { Component, OnInit } from '@angular/core';

interface Shift {
  employeeName: string;
  assignmentFromDate: string;
  assignmentToDate: string;
  shiftName: string;
  shiftStart: string;
  shiftEnd: string;
  shiftId: string;
  numberOfDays: number;
}

@Component({
  selector: 'app-shift-history',
  templateUrl: './shift-history.component.html',
  styleUrls: ['./shift-history.component.scss']
})
export class ShiftHistoryComponent implements OnInit {
  shifts: Shift[] = [];
  filteredShifts: Shift[] = [];
  searchName: string = '';
  startDate: string = '';
  endDate: string = '';

  ngOnInit(): void {
    this.loadShiftHistory();
  }

  loadShiftHistory(): void {
    const storedShifts = localStorage.getItem('assignedShifts');
    if (storedShifts) {
      this.shifts = JSON.parse(storedShifts);
      this.filteredShifts = this.shifts;
    }
  }

  filterShifts(): void {
    this.filteredShifts = this.shifts.filter(shift => {
      const fromDate = new Date(shift.assignmentFromDate);
      const toDate = new Date(shift.assignmentToDate);

      const matchesName = this.searchName
        ? shift.employeeName.toLowerCase().includes(this.searchName.toLowerCase())
        : true;

      const matchesDateRange =
        (!this.startDate || fromDate >= new Date(this.startDate)) &&
        (!this.endDate || toDate <= new Date(this.endDate));

      return matchesName && matchesDateRange;
    });
  }

  clearFilters(): void {
    this.searchName = '';
    this.startDate = '';
    this.endDate = '';
    this.filteredShifts = this.shifts;
  }
}
