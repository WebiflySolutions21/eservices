// form-renderer.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormConfig } from "@assets/constants/form.model" 
 
@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnInit {
  @Input() formConfig!: FormConfig;
  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.createFormControls();
  }

  createFormControls() {
    this.formConfig.sections.forEach(section => {
      section.fields.forEach(field => {
        const validators = field.required ? [Validators.required] : [];
        this.formGroup.addControl(
          field.id, 
          new FormControl(field.defaultValue || '', validators)
        );
      });
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Form submitted:', this.formGroup.value);
      // Here you would typically send the data to your backend
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}