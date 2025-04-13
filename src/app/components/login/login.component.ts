import { Component, OnInit } from '@angular/core';
import { LOGIN_FIELDS } from 'src/assets/constants/login-fields.constants';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, LoginService, UserService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fields = LOGIN_FIELDS;
  loginForm: any;
  userId: string | null = '';

  constructor(
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authenticationService:AuthenticationService,
    private userService:UserService,
    private route:ActivatedRoute
  ) {
    this.loginForm = FormGroup;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.route.queryParamMap.subscribe(params => {
      this.userId = params.get('userId');
      console.log(this.userId)
    });
  }

  redirectToRegistration() {
    this.router.navigate(['/main/agent']);
  }

  signup(){
    // this.router.navigate(['/auth/signup']);
    //redirect to signup page
  }

  loginUser() {
    console.log(this.loginForm.value);
    if(this.userId !="shift"){
      this.router.navigate([`/main/${this.userId}/${this.userId}-dashboard`])
    } else{
      this.router.navigate([`/main/${this.userId}-admin`])

    }
    return

    let payload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
    };
    this.loginService.login(payload).subscribe(
      (res: any) => {
        if (res && res?.success) {
          if (res['token']) {
            this.authenticationService.setAuthenticationToken(res["token"])
            this.userService.setUserInfo({
              token:res["token"],
              info:this.authenticationService.parseJWT(res["token"])
            })
          }
          this.toastrService.success('You Logged In Successfully', 'Success');
          this.router.navigate(['/main/agent']);
        }
        console.log(res);
      },
      (err) => {
        this.toastrService.error('Error In login', 'Error');
        console.log(err);
      }
    );
  }
}
