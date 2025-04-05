import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-shift-calendar',
  templateUrl: './shift-calendar.component.html',
  styleUrls: ['./shift-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShiftCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    dayMaxEventRows: 3, // Limit displayed events per day
    moreLinkContent: (arg) => `+${arg.num} more`, // Customize more link text
    moreLinkDidMount: (arg) => {
      arg.el.addEventListener('click', () => this.handleMoreClick(arg));
    },
    eventDidMount: (info) => {
      const eventDate = new Date(info.event.startStr);
      const today = new Date();

      const formatDate = (date: Date) => date.toISOString().split('T')[0];
      const isToday = formatDate(eventDate) === formatDate(today);

      let tooltipContent = info.event.title;

      if (isToday && info.event.extendedProps['shiftType'] === 'Shift') {
        const markIn = info.event.extendedProps['markInTime'] || 'N/A';
        const markOut = info.event.extendedProps['markOutTime'] || 'N/A';
        tooltipContent += `<br>Mark In: ${markIn} <br>Mark Out: ${markOut}`;
      }

      new bootstrap.Tooltip(info.el, {
        title: tooltipContent,
        html: true,
        placement: 'top',
      });
    },
  };

  
  
  moreEvents: any[] = [];
  selectedDate: string = '';

  ngOnInit(): void {
    this.loadAssignedShifts();
  }
  loadAssignedShifts(): void {
    const assignedShifts = JSON.parse(
      localStorage.getItem('assignedShifts') || '[]'
    );
    const shiftConfig = JSON.parse(localStorage.getItem('shifts') || '[]');
    const holidays = JSON.parse(localStorage.getItem('holidays') || '[]');
    const appliedLeaves = JSON.parse(
      localStorage.getItem('appliedLeaves') || '[]'
    );
    const attendanceData = JSON.parse(
      localStorage.getItem('attendance') || '[]'
    );
    const userRole = localStorage.getItem('userRole') || 'user';
    const currentUserName = localStorage.getItem('userName') || 'Lokesh';
  
    const events: any[] = [];
  
    // Get Approved Leaves for All Users
    const approvedLeaveDatesMap = new Map<string, Set<string>>();
    appliedLeaves.forEach((leave: any) => {
      if (leave.status === 'Approved') {
        let currentDate = new Date(leave.fromDate);
        const endDate = new Date(leave.toDate);
        const employeeName = leave.employeeName;
  
        if (!approvedLeaveDatesMap.has(employeeName)) {
          approvedLeaveDatesMap.set(employeeName, new Set<string>());
        }
  
        const leaveDates = approvedLeaveDatesMap.get(employeeName)!;
  
        while (currentDate <= endDate) {
          leaveDates.add(currentDate.toISOString().split('T')[0]);
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });
  
    // Load Shift Events based on Role
  // Load Shift Events based on Role
assignedShifts.forEach((shift: any) => {
  if (userRole === 'admin' || shift.employeeName === currentUserName) {
    const startDate = new Date(shift.assignmentFromDate);
    const endDate = new Date(shift.assignmentToDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error('Invalid date format in shift assignment:', shift);
      return;
    }

    let currentDate = new Date(startDate);

    const shiftConfigItem = shiftConfig.find(
      (ele: any) => ele.id === shift.shiftId
    );
    const shiftColor = shiftConfigItem ? shiftConfigItem.shiftColor : '#3788d8';

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];

      // Check if shift should be hidden due to an approved leave
      const employeeLeaveDates = approvedLeaveDatesMap.get(shift.employeeName) || new Set<string>();
      const isLeaveDay = employeeLeaveDates.has(dateString);

      if (!isLeaveDay) {
        // Fetch attendance data from local storage
        const attendanceData = JSON.parse(localStorage.getItem('attendance') || '[]');
        const attendance = attendanceData.find((att: any) =>
          att.employeeName === shift.employeeName && att.date === dateString
        );

        // Prepare attendance time display
        const markInTime = attendance ? attendance.markInTime : 'N/A';
        const markOutTime = attendance ? attendance.markOutTime : 'N/A';

        const attendanceDetails = `
          In: ${markInTime || 'N/A'} 
          Out: ${markOutTime || 'N/A'}
        `;

        events.push({
          title: `${shift.employeeName} - ${shift.shiftName}\n${attendanceDetails}`,
          start: dateString,
          color: shiftColor,
          textColor: '#fff',
          display: 'block',
          extendedProps: {
            shiftStart: shift.shiftStart,
            shiftEnd: shift.shiftEnd,
            markInTime: markInTime,
            markOutTime: markOutTime,
          },
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
});

  
    // Load Holiday Events
    holidays.forEach((holiday: any) => {
      if (holiday.type === 'Common') {
        events.push({
          title: `${holiday.name} (Holiday)`,
          start: holiday.date,
          color: '#FF6347',
          textColor: '#fff',
          display: 'block',
          extendedProps: {
            holidayType: holiday.type,
          },
        });
      }
    });
  
    // Load Approved Leave Events
    appliedLeaves.forEach((leave: any) => {
      if (userRole === 'admin' || leave.employeeName === currentUserName) {
        const startDate = new Date(leave.fromDate);
        const endDate = new Date(leave.toDate);
  
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error('Invalid date format in leave assignment:', leave);
          return;
        }
  
        let currentDate = new Date(startDate);
        if (leave.status === 'Approved') {
          while (currentDate <= endDate) {
            events.push({
              title: `${userRole === 'admin' ? leave.employeeName : ''} ${leave.leaveType} - Approved`,
              start: currentDate.toISOString().split('T')[0],
              color: '#29994A',
              textColor: '#000',
              display: 'block',
              extendedProps: {
                reason: leave.reason,
                numberOfDays: leave.numberOfDays,
              },
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }
        } else if (leave.status === 'Pending') {
          while (currentDate <= endDate) {
            events.push({
              title: `${userRole === 'admin' ? leave.employeeName : leave.leaveType} - Pending`,
              start: currentDate.toISOString().split('T')[0],
              color: '#ffc107',
              textColor: '#000',
              display: 'block',
              extendedProps: {
                reason: leave.reason,
                numberOfDays: leave.numberOfDays,
              },
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      }
    });
  
    // Log to verify events
    console.log('Events:', events);
  
    // Update calendar options
    this.calendarOptions = {
      ...this.calendarOptions,
      events: events,
    };
  }
  
  
selectedEvent: any = null;
handleEventClick(info: any): void {
  const event = info.event;

  if (event.extendedProps.holidayType) {
    alert(`Holiday: ${event.title}`);
  } else {
    // Store selected event details
    this.selectedEvent = event;

    // Show the modal using Bootstrap
    const modalElement = document.getElementById('attendanceModal') as HTMLElement;
    const attendanceModal = new bootstrap.Modal(modalElement);
    attendanceModal.show();
  }
}

closeAttendanceModal(): void {
  const modalElement = document.getElementById('attendanceModal') as HTMLElement;
  const attendanceModal = bootstrap.Modal.getInstance(modalElement);
  if (attendanceModal) {
    attendanceModal.hide();
  }
}


markAttendance(type: 'markIn' | 'markOut'): void {
  console.log(`Attempting to ${type}...`);
  if (navigator.geolocation) {
    console.log("Inside geolocation");
  
    const geoOptions = {
      enableHighAccuracy: false, // Set to true for higher accuracy
      timeout: 5000,             // Maximum wait time for location (5 seconds)
      maximumAge: 10000          // Accept a cached position if available (10 seconds)
    };
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Inside geolocation success");
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Current Location: (${latitude}, ${longitude})`);
        const officeLatitude = 19.16362536812418;
        const officeLongitude = 73.04506896829456;
        const maxDistance = 100; // Allowed range in meters
        const distance = this.calculateDistance(
          latitude,
          longitude,
          officeLatitude,
          officeLongitude
        );
  
        console.log(`Distance from office: ${distance.toFixed(2)} meters`);
        this.saveAttendance(null, type, latitude, longitude);
  
        // if (distance <= maxDistance) {
        //   alert(`${type === 'markIn' ? 'Marked In' : 'Marked Out'} successfully!`);
        //   // Store attendance data
        //   this.saveAttendance(null, type, latitude, longitude);
        // } else {
        //   alert(`You are not within the allowed range (${distance.toFixed(2)} meters).`);
        // }
      },
      (error) => {
        console.error('Error getting location:', error.message);
        alert('Error getting location: ' + error.message);
      },
      geoOptions
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
  
}

  
  
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Radius of the Earth in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Distance in meters
  }
  saveAttendance(event: any, type: 'markIn' | 'markOut', latitude: number, longitude: number): void {
    const attendanceData = JSON.parse(localStorage.getItem('attendance') || '[]');
    const assignedShifts = JSON.parse(localStorage.getItem('assignedShifts') || '[]');
    const currentUserName = localStorage.getItem('userName') || 'Lokesh';
    const dateString = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  
    // Find the current user's assigned shift for the day
    const userShift = assignedShifts.find((shift: any) => 
      shift.employeeName === currentUserName && 
      dateString >= shift.assignmentFromDate && 
      dateString <= shift.assignmentToDate
    );
  
    if (!userShift) {
      console.error('No assigned shift found for user:', currentUserName);
      return;
    }
  
    const shiftHours = this.calculateShiftHours(userShift.shiftStart, userShift.shiftEnd);
  
    // Find if attendance already exists for this date and user
    let attendanceRecord = attendanceData.find(
      (record: any) => record.date === dateString && record.employeeName === currentUserName
    );
  
    if (!attendanceRecord) {
      // If no record exists for today, create a new one
      attendanceRecord = {
        employeeName: currentUserName,
        date: dateString,
        markInTime: null,
        markOutTime: null,
        workingHours: 0,
        attendanceStatus: 'Absent',
        PL: 0,
      };
      attendanceData.push(attendanceRecord);
    }
  
    // Update mark-in or mark-out time
    const currentTime = new Date().toLocaleTimeString();
    if (type === 'markIn') {
      attendanceRecord.markInTime = currentTime;
    } else if (type === 'markOut') {
      attendanceRecord.markOutTime = currentTime;
  
      // Calculate working hours if both times are available
      if (attendanceRecord.markInTime && attendanceRecord.markOutTime) {
        const workedHours = this.calculateWorkingHours(attendanceRecord.markInTime, attendanceRecord.markOutTime);
        attendanceRecord.workingHours = workedHours;
  
        // Compare working hours with shift hours
        if (workedHours >= shiftHours) {
          attendanceRecord.attendanceStatus = 'Present';
        } else if (workedHours >= shiftHours / 2) {
          attendanceRecord.attendanceStatus = 'Half Day';
          attendanceRecord.PL = 0.5;
        } else {
          attendanceRecord.attendanceStatus = 'Absent';
          attendanceRecord.PL = 1;
        }
      }
    }
  
    localStorage.setItem('attendance', JSON.stringify(attendanceData));
    console.log('Attendance recorded:', attendanceRecord);
  
    // Reload events to update the calendar with the latest data
    setTimeout(() => {
      this.loadAssignedShifts();
    }, 100);
  
    // Update calendar options properly
    this.calendarOptions.events = [...event];
  }
  
  calculateWorkingHours(markIn: string, markOut: string): number {
    const markInDate = new Date(`1970-01-01T${markIn}`);
    const markOutDate = new Date(`1970-01-01T${markOut}`);
    const diff = markOutDate.getTime() - markInDate.getTime();
    return diff / (1000 * 60 * 60); // Convert milliseconds to hours
  }
  
  calculateShiftHours(shiftStart: string, shiftEnd: string): number {
    const shiftStartDate = new Date(`1970-01-01T${shiftStart}`);
    const shiftEndDate = new Date(`1970-01-01T${shiftEnd}`);
    const diff = shiftEndDate.getTime() - shiftStartDate.getTime();
    return diff / (1000 * 60 * 60); // Convert milliseconds to hours
  }
  
  
  
  handleMoreClick(arg: any): void {
    this.selectedDate = arg.dateStr;
  
    // Ensure that `arg.allSegs` is defined and an array
    if (Array.isArray(arg.allSegs)) {
      this.moreEvents = arg.allSegs.map((seg: any) => seg.event);
    } else {
      console.error('No events available for the selected date:', arg);
      this.moreEvents = [];
    }
  
    const modalElement = document.getElementById('shiftModal');
    if (modalElement) modalElement.style.display = 'block';
  }
  

  // handleMoreClick(arg: any): void {
  //   if (!arg.allSegs || !Array.isArray(arg.allSegs)) {
  //     console.error('No events available for the selected date.');
  //     return;
  //   }
  
  //   this.selectedDate = arg.dateStr;
  //   this.moreEvents = arg.allSegs.map((seg: any) => seg.event);
  
  //   const modalElement = document.getElementById('shiftModal');
  //   if (modalElement) modalElement.style.display = 'block';
  // }
  
  

  closeModal(): void {
    const modalElement = document.getElementById('shiftModal');
    if (modalElement) modalElement.style.display = 'none';
  }
}
