// form-builder.component.ts
import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  FormConfig,
  FormFieldConfig,
  FormSection,
} from '@assets/constants/form.model';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/core/services';
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent {
  @Input() logInCategoryTypes: any;
  @ViewChild('registerModal') registerModalRef!: ElementRef;
  registerModal: any;
  enableRegister = false;
  registerButtonText = 'View Register';
  showRegisterPrompt = false;

  formConfig: FormConfig = {
    id: '1',
    title: 'New Form',
    description: 'This is a new form', // Optional, you can remove it if not needed
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    sections: [],
  };
  @ViewChild('importModal') importModalRef!: ElementRef;

  availableFieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'number', label: 'Number' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date' },
    { value: 'datetime-local', label: 'Date & Time' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'multi-checkbox', label: 'Multi Checkboxes' },
  ];
  isEditMode = false;
  availableForms: FormConfig[] = [];
  modal: any;
  // Add these properties to your component
  isExistingForm = false;
  originalFormId: string | null = null;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute
  ) {}
  // Add to FormBuilderComponent
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const formId = params['id'];
      if (formId) {
        this.loadForm(formId);
      } else {
        this.initializeForm();
      }
    });
    console.log(this.logInCategoryTypes);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['logInCategoryTypes']) {
      // React to updated selectedItems here
      console.log('Updated logInCategoryTypes:', this.logInCategoryTypes);
      // you can also trigger form rebuilds or updates here
    }
  }
  ngAfterViewInit() {
    // Initialize modal after view is ready
    this.modal = new (window as any).bootstrap.Modal(
      this.importModalRef.nativeElement
    );
    this.registerModal = new (window as any).bootstrap.Modal(
      this.registerModalRef.nativeElement
    );
  }
  addOption(field: FormFieldConfig) {
    if (!field.options) field.options = [];
    field.options.push({ value: '', label: '' });
  }

  openImportModal() {
    this.availableForms = this.formService.getAllForms();
    this.modal.show();
  }

  // Update your importForm method
  importForm(form: FormConfig) {
    // Create deep copy but preserve the original ID
    this.formConfig = JSON.parse(JSON.stringify(form));
    this.originalFormId = form.id;
    this.isExistingForm = this.formService.formExists(form.id);
    this.isEditMode = true;
    this.modal.hide();
  }
  // Add these new methods
  updateForm() {
    if (!this.originalFormId) return;
    
    this.formConfig.id = this.originalFormId;
    this.formService.saveForm(this.formConfig);
    
    if (!this.formService.formHasRegister(this.originalFormId) || this.showRegisterPrompt) {
       this.handleRegisterSetup();
    }
    
    alert('Form updated successfully!');
  }
  
  handleRegisterSetup() {
    // Show the register configuration modal
    return new Promise<void>((resolve) => {
      this.registerModal.show();
      
      // Listen for when the modal is hidden
      this.registerModalRef.nativeElement.addEventListener('hidden.bs.modal', () => {
        resolve();
      }, { once: true });
    });
  }
  
  confirmRegister() {
    if (this.enableRegister) {
      this.formService.saveRegister(this.formConfig.id, {
        buttonText: this.registerButtonText,
        createdAt: new Date(),
        entries: []
      });
    }
    this.registerModal.hide();
    this.showRegisterPrompt = false;
  }

  createForm() {
    this.formConfig.id = this.formService.generateId();
    this.formConfig.createdAt = new Date();
    this.formConfig.version = 1;
    this.formService.saveForm(this.formConfig);
    
    // Always show register prompt for new forms
     this.handleRegisterSetup();
    
    alert('New form created successfully!');
    this.initializeForm();
  }
  countFields(form: FormConfig): number {
    return form.sections.reduce(
      (total, section) => total + section.fields.length,
      0
    );
  }

  removeOption(field: FormFieldConfig, index: number) {
    field.options?.splice(index, 1);
  }

  saveForm() {
    if (this.isExistingForm) {
       this.updateForm();
    } else {
       this.createForm();
    }
  }

  
  

  // Modify your initializeForm method
  initializeForm() {
    this.formConfig = {
      id: this.formService.generateId(),
      title: 'New Form',
      sections: [],
      description: 'This is a new form',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };
    this.isExistingForm = false;
    this.originalFormId = null;
    this.isEditMode = false;
  }

  importAsCopy(form: FormConfig) {
    // Create a new copy with new ID
    this.formConfig = this.formService.cloneForm(form);
    this.isExistingForm = false;
    this.originalFormId = null;
    this.isEditMode = true;
    this.modal.hide();
  }

  importForUpdate(form: FormConfig) {
    // Keep original ID for updating
    this.formConfig = JSON.parse(JSON.stringify(form));
    this.isExistingForm = true;
    this.originalFormId = form.id;
    this.isEditMode = true;
    this.modal.hide();
  }

  // Update your loadForm method
  loadForm(id: string) {
    const form = this.formService.getFormById(id);
    if (form) {
      this.formConfig = form;
      this.originalFormId = form.id;
      this.isExistingForm = true;
      this.isEditMode = true;
    }
  }

  addSection() {
    this.formConfig.sections.push({
      id: `section-${Date.now()}`,
      title: 'New Section',
      columns: 1,
      fields: [],
    });
  }

  // form-builder.component.ts
  addField(section: FormSection) {
    const defaults: any = {
      text: { placeholder: 'Enter text...' },
      number: { placeholder: 'Enter number...', min: null, max: null, step: 1 },
      date: { placeholder: 'Select date...', minDate: null, maxDate: null },
      'datetime-local': { placeholder: 'Pick date & time...' },
      checkbox: { defaultValue: false },
      select: { options: [{ value: '', label: '' }] },
      radio: { options: [{ value: '', label: '' }] },
      'multi-checkbox': { options: [{ value: '', label: '' }] },
    };

    const newField: FormFieldConfig = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: 'New Field',
      required: false,
      span: 1,
      ...defaults['text'],
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
    moveItemInArray(
      this.formConfig.sections,
      event.previousIndex,
      event.currentIndex
    );
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
