import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.scss'],
})
export class LeaveApprovalComponent implements OnInit {
  pendingLeaves: any[] = [];

  ngOnInit(): void {
    this.loadPendingLeaves();
  }

  loadPendingLeaves(): void {
    const appliedLeaves = JSON.parse(localStorage.getItem('appliedLeaves') || '[]');
    console.log('Applied Leaves:', appliedLeaves);
    
    // Filter for pending leaves only
    const pendingLeaves = appliedLeaves.filter((leave: any) => leave.status === 'Pending');
    
    if (pendingLeaves.length === 0) {
      console.log('No pending leaves to approve');
      return;
    }
  
    this.pendingLeaves = pendingLeaves;
  }
  

  approveLeave(leave: any): void {
    const appliedLeaves = JSON.parse(localStorage.getItem('appliedLeaves') || '[]');
    const leaveIndex = appliedLeaves.findIndex((l: any) => 
      l.employeeName === leave.employeeName &&
      l.fromDate === leave.fromDate &&
      l.toDate === leave.toDate
    );
  
    if (leaveIndex !== -1) {
      appliedLeaves[leaveIndex].status = 'Approved';
      localStorage.setItem('appliedLeaves', JSON.stringify(appliedLeaves));
      this.loadPendingLeaves(); // Refresh the list
    }
  }
  
  
  rejectLeave(leave: any): void {
    leave.status = 'Rejected';
    this.updateLeaveStatus(leave);
    alert(`Leave for ${leave.employeeName} rejected!`);
  }

   deductLeaveCount(userName: string, leaveType: string, days: number): void {
    const leaveConfig = JSON.parse(localStorage.getItem('leaveConfig') || '[]');
    const leaveTypeConfig = leaveConfig.find((leave: any) => leave.type === leaveType);
  
    if (leaveTypeConfig) {
      leaveTypeConfig.count -= days;
      localStorage.setItem('leaveConfig', JSON.stringify(leaveConfig));
    }
  }
  
  updateLeaveStatus(updatedLeave: any): void {
    let leaves = JSON.parse(localStorage.getItem('leaveAssignments') || '[]');
    leaves = leaves.map((leave: any) =>
      leave.employeeName === updatedLeave.employeeName &&
      leave.startDate === updatedLeave.startDate
        ? updatedLeave
        : leave
    );
    localStorage.setItem('leaveAssignments', JSON.stringify(leaves));
    this.loadPendingLeaves();
  }
}
