import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private apiUrl = 'http://localhost:3000/api/register';

  constructor(private http: HttpClient) {}

  save(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  getAll() {
    return this.http.get(this.apiUrl);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  update(_id: string, formData: FormData) {
    return this.http.put(`http://localhost:3000/api/register/${_id}`, formData);
  }
  getById(_id: string) {
    return this.http.get<any>(`http://localhost:3000/api/register/${_id}`);
  }
  
}

