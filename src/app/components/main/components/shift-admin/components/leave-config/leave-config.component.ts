import { Component, OnInit } from '@angular/core';

interface LeaveType {
  id: string;
  name: string;
  days: number;
}

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'Common' | 'Optional';
}

@Component({
  selector: 'app-leave-config',
  templateUrl: './leave-config.component.html',
  styleUrls: ['./leave-config.component.scss']
})
export class LeaveConfigComponent implements OnInit {
  leaveTypes: LeaveType[] = [];
  holidays: Holiday[] = [];
  leaveName: string = '';
  leaveDays: number = 0;
  holidayName: string = '';
  holidayDate: string = '';
  holidayType: 'Common' | 'Optional' = 'Common';

  ngOnInit(): void {
    this.loadConfig();
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  loadConfig(): void {
    const storedLeaveTypes = localStorage.getItem('leaveTypes');
    const storedHolidays = localStorage.getItem('holidays');

    if (storedLeaveTypes) {
      this.leaveTypes = JSON.parse(storedLeaveTypes);
    }
    if (storedHolidays) {
      this.holidays = JSON.parse(storedHolidays);
    }
  }

  saveConfig(): void {
    localStorage.setItem('leaveTypes', JSON.stringify(this.leaveTypes));
    localStorage.setItem('holidays', JSON.stringify(this.holidays));
  }

  addLeaveType(): void {
    if (this.leaveName && this.leaveDays > 0) {
      const newLeaveType: LeaveType = {
        id: this.generateId(),
        name: this.leaveName,
        days: this.leaveDays
      };
      this.leaveTypes.push(newLeaveType);
      this.leaveName = '';
      this.leaveDays = 0;
      this.saveConfig();
    }
  }

  deleteLeaveType(id: string): void {
    this.leaveTypes = this.leaveTypes.filter(type => type.id !== id);
    this.saveConfig();
  }

  addHoliday(): void {
    if (this.holidayName && this.holidayDate) {
      const newHoliday: Holiday = {
        id: this.generateId(),
        name: this.holidayName,
        date: this.holidayDate,
        type: this.holidayType
      };
      this.holidays.push(newHoliday);
      this.holidayName = '';
      this.holidayDate = '';
      this.holidayType = 'Common';
      this.saveConfig();
    }
  }

  deleteHoliday(id: string): void {
    this.holidays = this.holidays.filter(holiday => holiday.id !== id);
    this.saveConfig();
  }
}
