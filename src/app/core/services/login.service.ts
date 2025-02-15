import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  login(payload:any){
    return this.httpClient.post(`${environment.API_HOST}/login`,payload)
  }
}
