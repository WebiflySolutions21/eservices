// form-builder.component.ts
import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormConfig, FormFieldConfig, FormSection } from '@assets/constants/form.model';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/core/services';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {
  formConfig: FormConfig = {
    id: '1',
    title: 'New Form',
    description: 'This is a new form',  // Optional, you can remove it if not needed
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    sections: [],
  };

  availableFieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'number', label: 'Number' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date' }
  ];
  isEditMode = false;

  constructor(private formService: FormService,private route:ActivatedRoute) {}
  // Add to FormBuilderComponent
  ngOnInit() {
    this.route.params.subscribe(params => {
      const formId = params['id'];
      if (formId) {
        this.loadForm(formId);
      } else {
        this.initializeForm();
      }
    });
  }

addOption(field: FormFieldConfig) {
  if (!field.options) field.options = [];
  field.options.push({ value: '', label: '' });
}

removeOption(field: FormFieldConfig, index: number) {
  field.options?.splice(index, 1);
}

saveForm() {
  this.formService.saveForm(this.formConfig);
  alert('Form saved successfully!');
  this.initializeForm(); // Reset for new form
}

initializeForm() {
  this.formConfig = {
    id: this.formService.generateId(),
    title: 'New Form',
    sections: [],
    description: 'This is a new form',  // Optional, you can remove it if not needed
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
  };
}

loadForm(id: string) {
  const form = this.formService.getFormById(id);
  if (form) {
    this.formConfig = form;
    this.isEditMode = true;
  }
}

  addSection() {
    this.formConfig.sections.push({
      id: `section-${Date.now()}`,
      title: 'New Section',
      columns: 1,
      fields: []
    });
  }

 // form-builder.component.ts
addField(section: FormSection) {
  const defaults: any = {
    text: { placeholder: 'Enter text...' },
    number: { placeholder: 'Enter number...', min: null, max: null, step: 1 },
    date: { placeholder: 'Select date...', minDate: null, maxDate: null },
    checkbox: { defaultValue: false },
    select: { options: [{value: '', label: ''}] }
  };

  const newField: FormFieldConfig = {
    id: `field-${Date.now()}`,
    type: 'text',
    label: 'New Field',
    required: false,
    span: 1,
    ...defaults['text']
  };

  section.fields.push(newField);
}

  removeSection(index: number) {
    this.formConfig.sections.splice(index, 1);
  }

  removeField(section: FormSection, index: number) {
    section.fields.splice(index, 1);
  }

  onSectionDrop(event: CdkDragDrop<FormSection[]>) {
    moveItemInArray(this.formConfig.sections, event.previousIndex, event.currentIndex);
  }

  onFieldDrop(event: CdkDragDrop<FormFieldConfig[]>, section: FormSection) {
    if (event.previousContainer === event.container) {
      moveItemInArray(section.fields, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}