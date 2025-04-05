import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

interface Patient {
  id: number;
  name: string;
  tokenNumber: number;
  registrationTime: Date;
  status: 'waiting' | 'in-progress' | 'completed';
}

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private patients: Patient[] = [];
  private currentToken$ = new BehaviorSubject<number>(1);
  private averageProcessingTime = 3; // minutes per patient

  constructor() {}

  registerPatient(name: string): Observable<number> {
    const tokenNumber = this.generateTokenNumber();
    const newPatient: Patient = {
      id: Date.now(),
      name,
      tokenNumber,
      registrationTime: new Date(),
      status: 'waiting'
    };
    this.patients.push(newPatient);
    return new BehaviorSubject(tokenNumber).asObservable();
  }

  getQueue(): Patient[] {
    return this.patients;
  }

  getCurrentToken(): Observable<number> {
    return this.currentToken$.asObservable();
  }

  advanceToken(): void {
    const nextPatient = this.patients.find(p => p.status === 'waiting');
    if (nextPatient) {
      nextPatient.status = 'in-progress';
      this.currentToken$.next(nextPatient.tokenNumber);

      setTimeout(() => {
        nextPatient.status = 'completed';
        this.advanceToken();
      }, this.averageProcessingTime * 60 * 1000);
    }
  }

  private generateTokenNumber(): number {
    return this.patients.length > 0 
      ? Math.max(...this.patients.map(p => p.tokenNumber)) + 1 
      : 1;
  }
  getTokenStatus(tokenNumber: number): Observable<any> {
    const patient = this.patients.find(p => p.tokenNumber === tokenNumber);
    if (!patient) {
      return of(null);
    }
  
    const currentPosition = this.patients
      .filter(p => p.status === 'waiting')
      .findIndex(p => p.tokenNumber === tokenNumber) + 1;
  
    const patientsAhead = this.patients
      .filter(p => p.status === 'waiting' && p.tokenNumber !== tokenNumber)
      .slice(0, 5); // Get next 5 patients ahead
  
    const estimatedWaitTime = currentPosition * this.averageProcessingTime;
  
    return of({
      tokenNumber: patient.tokenNumber,
      status: patient.status,
      currentPosition,
      patientsAhead,
      estimatedWaitTime,
      currentToken: this.currentToken$.value
    });
  }
  
}
