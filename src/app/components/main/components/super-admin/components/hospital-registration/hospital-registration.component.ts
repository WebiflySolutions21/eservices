import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hospital-registration',
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.scss']
})
export class HospitalRegistrationComponent {
  registrationForm: FormGroup;

  formFields = [
    { label: 'Registration Date', name: 'regDate', type: 'date', validators: Validators.required },
    { label: 'Hospital Name', name: 'name', type: 'text', validators: Validators.required },
    { label: 'Mobile Number', name: 'mobile', type: 'text', validators: [Validators.required, Validators.pattern('^[0-9]{10}$')] },
    { label: 'Hospital Registration Number', name: 'hospRegNo', type: 'text', validators: Validators.required },
    { label: 'Address', name: 'address', type: 'textarea', validators: Validators.required },
    { label: 'Amount', name: 'amount', type: 'number', validators: [Validators.required, Validators.min(0)] },
    { label: 'Payment Type', name: 'paymentType', type: 'select', options: ['Cash', 'Cheque', 'Netbanking', 'UPI', 'NEFT', 'RTGS'], validators: Validators.required },
    { label: 'Payment Date', name: 'paymentDate', type: 'date', validators: Validators.required },
  ];

  constructor(private fb: FormBuilder) {
    const formGroupConfig = {};
    this.formFields.forEach(field => {
      formGroupConfig[field.name] = ['', field.validators];
    });
    this.registrationForm = this.fb.group(formGroupConfig);
  }

  submit() {
      console.log('Form Submitted:', this.registrationForm.value);

    // if (this.registrationForm.valid) {
    //   console.log('Form Submitted:', this.registrationForm.value);
    //   // API call can go here
    // } else {
    //   this.registrationForm.markAllAsTouched();
    // }
  }
}
