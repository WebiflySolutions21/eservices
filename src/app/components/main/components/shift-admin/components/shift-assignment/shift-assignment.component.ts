import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-shift-assignment',
  templateUrl: './shift-assignment.component.html',
  styleUrls: ['./shift-assignment.component.scss']
})
export class ShiftAssignmentComponent implements OnInit {
  assignmentForm: FormGroup;
  savedShifts: any[] = [];
  assignedShifts: any[] = [];
  numberOfDays: number = 0;

  constructor(private fb: FormBuilder) {
    this.assignmentForm = this.fb.group({
      employeeName: [''],
      shiftId: [''],
      assignmentFromDate: [''],
      assignmentToDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadShifts();
    this.loadAssignments();
  }

  loadShifts(): void {
    this.savedShifts = JSON.parse(localStorage.getItem('shifts') || '[]');
  }

  loadAssignments(): void {
    this.assignedShifts = JSON.parse(localStorage.getItem('assignedShifts') || '[]');
  }

  calculateDays(): void {
    const fromDate = new Date(this.assignmentForm.get('assignmentFromDate')?.value);
    const toDate = new Date(this.assignmentForm.get('assignmentToDate')?.value);

    if (fromDate && toDate && toDate >= fromDate) {
      const timeDifference = toDate.getTime() - fromDate.getTime();
      this.numberOfDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    } else {
      this.numberOfDays = 0;
    }
  }

  assignShift(): void {
    const shiftId = this.assignmentForm.get('shiftId')?.value;
    const selectedShift = this.savedShifts.find(shift => shift.id === shiftId);

    if (selectedShift) {
      const assignmentData = {
        employeeName: this.assignmentForm.get('employeeName')?.value,
        assignmentFromDate: this.assignmentForm.get('assignmentFromDate')?.value,
        assignmentToDate: this.assignmentForm.get('assignmentToDate')?.value,
        numberOfDays: this.numberOfDays,
        shiftName: selectedShift.shiftName,
        shiftStart: selectedShift.shiftStart,
        shiftEnd: selectedShift.shiftEnd,
        shiftId: selectedShift.id,
        employeeId:uuidv4(),
      };

      const assignments = JSON.parse(localStorage.getItem('assignedShifts') || '[]');
      assignments.push(assignmentData);
      localStorage.setItem('assignedShifts', JSON.stringify(assignments));

      alert('Shift successfully assigned!');
      this.loadAssignments();
      this.assignmentForm.reset();
      this.numberOfDays = 0;
    }
  }
}
