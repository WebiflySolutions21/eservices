import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.scss'],
})
export class LeaveApplicationComponent implements OnInit {
  leaveType: string = '';
  fromDate: string = '';
  toDate: string = '';
  reason: string = '';
  availableLeaveTypes: any[] = [];
  leaveConfig = [
    { name: 'Sick Leave', days: 10 },
    { name: 'Casual Leave', days: 12 },
    { name: 'Privilege Leave', days: 15 },
    { name: 'Annual Leave', days: 20 },
  ];
  
  ngOnInit(): void {
  localStorage.setItem('leaveConfig', JSON.stringify(this.leaveConfig));

    this.loadLeaveTypes();
  }

  loadLeaveTypes(): void {
    const leaveConfig = JSON.parse(localStorage.getItem('leaveConfig') || '[]');
    this.availableLeaveTypes = leaveConfig;
  }

  applyLeave(): void {
    const appliedLeaves = JSON.parse(localStorage.getItem('appliedLeaves') || '[]');
    const numberOfDays = this.calculateDays(this.fromDate, this.toDate);

    // Check for valid leave days
    const leaveTypeConfig = this.availableLeaveTypes.find(
      (type) => type.name === this.leaveType
    );

    if (!leaveTypeConfig || numberOfDays > leaveTypeConfig.days) {
      alert('Insufficient leave balance or invalid leave type.');
      return;
    }

    const leaveRequest = {
      employeeName: localStorage.getItem('userName') || 'Lokesh',
      leaveType: this.leaveType,
      fromDate: this.fromDate,
      toDate: this.toDate,
      numberOfDays,
      reason: this.reason,
      status: 'Pending',
    };

    appliedLeaves.push(leaveRequest);
    localStorage.setItem('appliedLeaves', JSON.stringify(appliedLeaves));
    alert('Leave applied successfully!');
    this.clearForm();
  }

  calculateDays(fromDate: string, toDate: string): number {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }

  clearForm(): void {
    this.leaveType = '';
    this.fromDate = '';
    this.toDate = '';
    this.reason = '';
  }
}
