// dynamic-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormConfig } from '@assets/constants/form.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormConfig = {
    id: '1',
    title: 'New Form',
    description: 'This is a new form',  // Optional, you can remove it if not needed
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    sections: [],
  };
  
  formGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.createFormControls();
  }
  // In your component class
hasError(fieldId: string, errorType: string): boolean {
  const control = this.formGroup.get(fieldId);
  return control ? control.hasError(errorType) : false;
}

  // dynamic-form.component.ts
createFormControls() {
  this.config.sections.forEach(section => {
    section.fields.forEach(field => {
      const validators = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      
      if (field.type === 'number') {
        if (field.min !== null && field.min !== undefined) {
          validators.push(Validators.min(field.min));
        }
        if (field.max !== null && field.max !== undefined) {
          validators.push(Validators.max(field.max));
        }
      }
      
      // For checkbox fields, use the defaultValue if provided
      const defaultValue = field.type === 'checkbox' 
        ? field.defaultValue || false 
        : field.defaultValue || '';
      
      this.formGroup.addControl(
        field.id, 
        new FormControl(defaultValue, validators)
      );
    });
  });
}

getErrorMessages(fieldId: string): string[] {
  const control = this.formGroup.get(fieldId);
  if (!control || !control.errors || !control.touched) return [];
  
  return Object.keys(control.errors).map(key => {
    const error = control.errors?.[key];
    switch(key) {
      case 'required': return 'This field is required';
      case 'min': return `Minimum value is ${error.min}`;
      case 'max': return `Maximum value is ${error.max}`;
      case 'minlength': return `Minimum length is ${error.requiredLength}`;
      case 'maxlength': return `Maximum length is ${error.requiredLength}`;
      case 'pattern': return 'Invalid format';
      default: return 'Invalid value';
    }
  });
}
}