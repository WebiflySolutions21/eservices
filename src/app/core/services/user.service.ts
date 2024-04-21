import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userInfo:any
  constructor() { }

  setUserInfo(info:any){
    this.userInfo=info
    localStorage["userInfo"]=JSON.stringify(info)
  }

  getUserInfo(){
    const userInfo=localStorage["userInfo"]
    if(userInfo){
      return JSON.parse(userInfo)
    }
    return this.userInfo
  }
}
