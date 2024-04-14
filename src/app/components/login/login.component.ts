import { Component, OnInit } from '@angular/core';
import { LOGIN_FIELDS } from 'src/assets/constants/login-fields.constants';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fields = LOGIN_FIELDS;
  loginForm:any;

  constructor(private toastrService: ToastrService, private fb: FormBuilder,private router:Router) {
    this.loginForm = FormGroup
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
        username:['',Validators.required],
        password:['',Validators.required]
    })
  }

  redirectToRegistration(){
    this.router.navigate(['/main'])
  }

  loginUser(){
    this.toastrService.success("You Logged In Successfully","Success")
    console.log(this.loginForm.value)
  }
}
