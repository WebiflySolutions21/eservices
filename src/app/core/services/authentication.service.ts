import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
token:any
  constructor() { }

  setAuthenticationToken(token:any){
    this.token=token
  }

  getAuthenticationToken(token:any){
    return token;
  }

  parseJWT(token:any){
    const base64Url=token.split('.')[1]
    const base64=base64Url.replace('-','+').replace('_','/');
    return JSON.parse(window.atob(base64))
  }
}
