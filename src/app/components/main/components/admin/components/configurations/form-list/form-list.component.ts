// form-list.component.ts
import { Component } from '@angular/core';
import {FormConfig} from "@assets/constants/form.model"
import { FormService } from 'src/app/core/services';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent {
  forms: FormConfig[] = [];

  constructor(private formService: FormService) {
    this.loadForms();
  }

  loadForms() {
    this.forms = this.formService.getAllForms();
  }

  deleteForm(id: string) {
    if (confirm('Are you sure you want to delete this form?')) {
      this.formService.deleteForm(id);
      this.loadForms();
    }
  }
}