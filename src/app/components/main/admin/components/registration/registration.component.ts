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
//  data = {
//   sections: [
//     {
//       id: "splashPageUiConfig",
//       title: "Splash Page UI Configuration",
//       description: "",
//       piFields: [
//         {
//           type: "imageUpload",
//           label: "Splash Image",
//           subLabel: "",
//           apiKey: "splashImage",
//           default: "",
//           placeholder: "",
//           info: "(jpg/png/webp/gif only)",
//           validations: {
//             fileType: { val: ["jpg", "png", "webp", "gif"], msg: "" },
//             maxsize_KB: { val: 300, msg: "" },
//             required: { val: 0, msg: "" },
//           },
//           extra: {
//             uploadApi: "",
//           },
//         },
//         {
//           type: "text",
//           label: "Splash Image Alt Text",
//           subLabel: "",
//           apiKey: "splashImageAltText",
//           default: "",
//           placeholder: "Enter Splash Image Alt Text",
//           info: "",
//           validations: {
//             maximum_length: { val: 50, msg: "" },
//             required: { val: 1, msg: "" },
//           },
//           extra: {},
//         },
//         {
//           type: "text",
//           label: "Splash Title Text 1",
//           subLabel: "",
//           apiKey: "splashTitleText1",
//           default: "",
//           placeholder: "Enter Splash Title Text 1",
//           info: "",
//           validations: {
//             maximum_length: { val: 50, msg: "" },
//             required: { val: 1, msg: "" },
//           },
//           extra: {},
//         },
//         {
//           type: "text",
//           label: "Splash Title Text 2",
//           subLabel: "",
//           apiKey: "splashTitleText2",
//           default: "",
//           placeholder: "Enter Splash Title Text 2",
//           info: "",
//           validations: {
//             maximum_length: { val: 50, msg: "" },
//             required: { val: 1, msg: "" },
//           },
//           extra: {},
//         },
//         {
//           type: "text",
//           label: "Splash Title Text 3",
//           subLabel: "",
//           apiKey: "splashTitleText3",
//           default: "",
//           placeholder: "Enter Splash Title Text 3",
//           info: "",
//           validations: {
//             maximum_length: { val: 50, msg: "" },
//             required: { val: 1, msg: "" },
//           },
//           extra: {},
//         },
//       ],
//       sectionCta: {
//         label: "Preview",
//         showCta: true,
//       },
//     },
//   ],
//   hideSectionHeader: false,
//   isSubmit: true,
// };
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
        console.log(params)
        const currentLoginType = params.get("loginType"); // Example: "Doctor"
        console.log(currentLoginType)
        // Filter if the form is meant for this login type
        console.log(this.formData)
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
