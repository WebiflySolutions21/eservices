import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RECEPTION_ROUTES,RECEPTION_VIEW_ROUTES } from '@assets/constants/reception.constants';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent {
  receptionRoutes = RECEPTION_ROUTES;
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
  this.router.events.subscribe(() => {
    const currentUrl = this.router.url;

    // Check if the URL contains either "opd-bill" or "ipd-bill"
    if (/opd-bill|ipd-bill|patient-registration|patient-management/.test(currentUrl)) {
      this.receptionRoutes = RECEPTION_VIEW_ROUTES;
    } else {
      this.receptionRoutes = RECEPTION_ROUTES;
    }
  });
}

 
   navigateUser(data) {
     this.router.navigate([`/main/reception/${data?.path}`])
 
     console.log(data);
   }
 
}
