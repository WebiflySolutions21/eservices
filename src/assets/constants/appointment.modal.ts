// appointment.model.ts
export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    availableDays?: string[]; // Optional: e.g., ['Monday', 'Wednesday']
  }
  
  export interface Appointment {
    id?: string;
    patientId: string;
    doctorId: string;
    date: string;
    slot: string;
    reason?: string;
    status?: 'Pending' | 'Confirmed' | 'Cancelled';
  }