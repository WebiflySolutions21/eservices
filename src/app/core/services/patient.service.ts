import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  savePatient(data: any) {
    return this.http.post('http://localhost:3000/api/patient', data);
  }
  
  getPatients() {
    return this.http.get<any[]>('http://localhost:3000/api/patient');
  }
  
  getPatientById(_id: string) {
    return this.http.get<any>(`http://localhost:3000/api/patient/${_id}`);
  }
  
  updatePatient(_id: string, data: any) {
    return this.http.put(`http://localhost:3000/api/patient/${_id}`, data);
  }
  
  deletePatient(_id: string) {
    return this.http.delete(`http://localhost:3000/api/patient/${_id}`);
  }
  
}
