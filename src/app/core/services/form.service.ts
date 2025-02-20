import { Injectable } from '@angular/core';
import { DynamicFormConfig } from '@assets/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private registrationForm: any;

  constructor() {
    this.registrationForm = null;
  }

  setRegistrationForm(formData: any) {
    this.registrationForm = formData;
  }

  getRegistrationForm() {
    return this.registrationForm;
  }
}

