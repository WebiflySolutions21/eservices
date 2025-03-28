import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  saveData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateData(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
