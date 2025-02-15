import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private httpClient:HttpClient) { }

  getAgentDashboardData(){
    return this.httpClient.get(environment.API_HOST+"/agent/dashboard")
  }
}
