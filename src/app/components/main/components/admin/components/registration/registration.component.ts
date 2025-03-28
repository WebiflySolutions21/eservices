import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFormValueData } from '@assets/constants/app.constants';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
formData:any
displayForm:any
jsonObs$ = new BehaviorSubject<any>(null)
formValueObs$ = new BehaviorSubject<IFormValueData>({
  isSubmit:false,
  isPreload:false,
  data:null
})

data:any
constructor(private route:ActivatedRoute){}
  ngOnInit() {
    this.jsonObs$.next(this.data)
    const storedForm = localStorage.getItem("submittedForm");
    if (storedForm) {
      this.formData = JSON.parse(storedForm);
      console.log(this.formData)
      this.jsonObs$.next(this.formData)
      this.route.queryParamMap.subscribe(params => {
        const currentLoginType = params.get("loginType"); // Example: "Doctor"
        if (this.formData.loginType.some((login: any) => login === currentLoginType)) {
          this.displayForm = true;
        } else {
          this.displayForm = false;
        }
      });
    }
  }

  previewCtaClick(event){
    console.log(event)
  }
  
}
