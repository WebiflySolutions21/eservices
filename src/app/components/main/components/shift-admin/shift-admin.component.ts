import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SHIFT_ROUTES} from 'src/assets/constants/shift.constants';
@Component({
  selector: 'app-shift-admin',
  templateUrl: './shift-admin.component.html',
  styleUrls: ['./shift-admin.component.scss']
})
export class ShiftAdminComponent {
shiftRoutes = SHIFT_ROUTES;
  hospitalName = "Hospital Name"
  loginDetails = {
   name : "Lokesh Thakare",
   imageUrl:"assets/images/header/doctor.jpeg",
   designation:"Doctor",
   contactNo:"1234567890",
   type:"Orthopedic",
  }
 constructor(private router:Router){}
 
 ngOnInit() {
}

 
   navigateUser(data) {
     this.router.navigate([`/main/shift-admin/${data?.path}`])
 
   }
}
