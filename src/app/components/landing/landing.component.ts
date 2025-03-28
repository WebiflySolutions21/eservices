import { Component } from '@angular/core';
import {LOGIN_ROUTES} from "@assets/constants/app.constants"
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
loginRoutes = LOGIN_ROUTES;
hospitalName = "HOSPITAL NAME"

constructor(private router:Router){}

navigateUser(data:any){
    this.router.navigate([`/login`], { queryParams: { userId: data?.identification} })
}
}
