import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-shift-config',
  templateUrl: './shift-config.component.html',
  styleUrls: ['./shift-config.component.scss']
})
export class ShiftConfigComponent {
  shiftForm: FormGroup;
  savedShifts: any[] = [];
  shiftDuration: string = '00:00';
  totalWeeklyHours: number = 0;

  constructor(private fb: FormBuilder) {
    this.shiftForm = this.fb.group({
      shiftName: [''],
      shiftStart: [''],
      shiftEnd: [''],
      shiftColor: ['#000000'],
      minHours: [''],
      halfDayHours: [''],
      totalHoursPerDay: [''],
      totalHoursPerWeek: [''],
      holidaysPerWeek: ['']
    });
    this.loadShifts();
  }

  onSubmit(): void {
    const shiftData = {
      id: uuidv4(),
      ...this.shiftForm.value,
      duration: this.shiftDuration,
      totalWeeklyHours: this.totalWeeklyHours
    };

    const shifts = JSON.parse(localStorage.getItem('shifts') || '[]');
    shifts.push(shiftData);
    localStorage.setItem('shifts', JSON.stringify(shifts));

    alert('Shift configuration submitted and saved!');
    this.loadShifts();
    this.shiftForm.reset();
    this.shiftDuration = '00:00';
    this.totalWeeklyHours = 0;
  }

  loadShifts(): void {
    this.savedShifts = JSON.parse(localStorage.getItem('shifts') || '[]');
  }

  calculateWeeklyHours(): void {
    const totalHoursPerDay = Number(this.shiftForm.get('totalHoursPerDay')?.value) || 0;
    const holidaysPerWeek = Number(this.shiftForm.get('holidaysPerWeek')?.value) || 0;
    const workDays = 7 - holidaysPerWeek;

    this.totalWeeklyHours = totalHoursPerDay * workDays;
  }

  calculateDuration(): void {
    const start = this.shiftForm.get('shiftStart')?.value;
    const end = this.shiftForm.get('shiftEnd')?.value;

    if (start && end) {
      const startTime = this.parseTime(start).getTime();
      const endTime = this.parseTime(end).getTime();

      let durationMinutes = (endTime - startTime) / (1000 * 60);
      if (durationMinutes < 0) durationMinutes += 24 * 60;

      const hours = Math.floor(durationMinutes / 60);
      const minutes = Math.floor(durationMinutes % 60);
      this.shiftDuration = this.formatTime(hours) + ':' + this.formatTime(minutes);
    }
  }

  parseTime(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
