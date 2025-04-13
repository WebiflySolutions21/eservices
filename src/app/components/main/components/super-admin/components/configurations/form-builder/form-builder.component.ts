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
import { SUPER_ADMIN_TABLE_DATA } from '@assets/constants/super-admin.constants';
interface FormVisibilityOption {
  id: number | string;
  name: string;
}

interface FormVisibilityItem {
  [key: string]: FormVisibilityOption[];
  isPrintable: any;
}

// Helper type for the dropdown options
interface DropdownOption {
  name: string;
  value: string;
  dropdownId: number;
}
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})

export class FormBuilderComponent {
  logInCategoryTypes: any;
  @ViewChild('registerModal') registerModalRef!: ElementRef;
  registerModal: any;
  enableRegister = false;
  registerButtonText = 'View Register';
  showRegisterPrompt = false;
  selectedCheckboxes: FormVisibilityItem[] = [];
  formConfig: FormConfig = {
    id: '1',
    title: 'New Form',
    description: 'This is a new form', // Optional, you can remove it if not needed
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    sections: [],
    formVisibility: [],
  };
  @ViewChild('importModal') importModalRef!: ElementRef;

  loginType = [
    { id: 1, name: 'Doctor', value: "doctor" },
    { id: 2, name: 'Staff', value: "staff" },
    { id: 3, name: 'Reception', value: "reception" },
    { id: 4, name: 'Opthal', value: "opthal" },
    { id: 5, name: 'Lab', value: "lab" },
    { id: 6, name: "Medical", value: "medical" },
    { id: 7, name: "Admin", value: "admin" }
  ].map(item => ({
    ...item,
    // Ensure consistent string IDs for comparison
    id: item.id.toString(),
    value: item.value.toLowerCase()
  }));
  hospitalList = SUPER_ADMIN_TABLE_DATA
  dropdowns = [
    { label: 'LoginType', options: this.loginType, dropdownId: 1 },
    { label: 'Select Hospital', options: this.hospitalList, dropdownId: 2 },
  ];
  availableFieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'number', label: 'Number' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date' },
    { value: 'datetime-local', label: 'Date & Time' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'multi-checkbox', label: 'Multi Checkboxes' },
    { value: 'file', label: 'File Upload' },
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

  onSelectionChanged(selectedOptions) {
    if (!selectedOptions || !selectedOptions.length) {
      this.selectedCheckboxes = [];
      return;
    }
  
    // Create a map for quick lookup
    const newSelectionsMap = new Map();
    selectedOptions.forEach(option => {
      newSelectionsMap.set(option.label, option);
    });
  
    // Update existing or add new
    const updatedSelections = [];
    newSelectionsMap.forEach((value, key) => {
      const existingIndex = this.selectedCheckboxes.findIndex(
        item => Object.keys(item)[0] === key
      );
  
      if (existingIndex !== -1) {
        // Update existing
        this.selectedCheckboxes[existingIndex] = {
          [key]: value.options.map(opt => ({
            id: parseInt(opt.value),
            name: opt.name
          })),
          isPrintable: value.isPrintEnabled
        };
      } else {
        // Add new
        updatedSelections.push({
          [key]: value.options.map(opt => ({
            id: parseInt(opt.value),
            name: opt.name
          })),
          isPrintable: value.isPrintEnabled
        });
      }
    });
  
    // Remove items that are no longer selected
    this.selectedCheckboxes = this.selectedCheckboxes.filter(item => {
      const key = Object.keys(item)[0];
      return newSelectionsMap.has(key);
    }).concat(updatedSelections);
  
    console.log('Updated selections:', this.selectedCheckboxes);
  }
  addOption(field: FormFieldConfig) {
    if (!field.options) field.options = [];
    field.options.push({ value: '', label: '' });
  }

  openImportModal() {
    this.availableForms = this.formService.getAllForms();
    this.modal.show();
  }

  getInitialSelections(label: string): any[] {
    if (!this.selectedCheckboxes || !this.selectedCheckboxes.length) {
      console.log('No selected checkboxes for label:', label);
      return [];
    }
  
    console.log('Looking for selections:', {
      label,
      selectedCheckboxes: this.selectedCheckboxes
    });
  
    const visibilityItem = this.selectedCheckboxes.find(item => {
      const key = Object.keys(item)[0];
      console.log('Checking item:', { key, matches: key === label });
      return key === label;
    });
  
    if (!visibilityItem) {
      console.log('No visibility item found for label:', label);
      return [];
    }
  
    const key = Object.keys(visibilityItem)[0];
    const options = visibilityItem[key];
  
    console.log('Found options for', key, ':', options);
  
    // Handle LoginType specifically
    if (key === 'LoginType') {
      return options.map(opt => {
        // Convert ID to string for comparison
        const optId = opt.id?.toString();
        const matched = this.loginType.find(lt => 
          lt.id === optId || 
          lt.name?.toLowerCase() === opt.name?.toLowerCase()
        );
  
        if (!matched) {
          console.warn('No match found for LoginType option:', opt);
        }
  
        return {
          name: matched?.name || opt.name,
          value: matched?.id || optId,
          dropdownId: this.dropdowns.find(d => d.label === key)?.dropdownId || 0
        };
      });
    }
  
    // Default handling for other dropdowns
    return options.map(opt => ({
      name: opt.name,
      value: opt.id?.toString(),
      dropdownId: this.dropdowns.find(d => d.label === key)?.dropdownId || 0
    }));
  }
  // Update your importForm method
  importForm(form: FormConfig) {
    this.formConfig = JSON.parse(JSON.stringify(form));
    this.originalFormId = form.id;
    this.isExistingForm = this.formService.formExists(form.id);
    this.isEditMode = true;
    
    // Reset selections
    this.selectedCheckboxes = [];
    
    if (form.formVisibility) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        console.log('Importing form with visibility:', form.formVisibility);
        this.setDropdownSelections(form.formVisibility);
      }, 100);
    }
    
    this.modal.hide();
  }
  // Add these new methods
  updateForm() {
    if (!this.originalFormId) return;

    this.formConfig.id = this.originalFormId;
    this.formService.saveForm(this.formConfig);

    if (
      !this.formService.formHasRegister(this.originalFormId) ||
      this.showRegisterPrompt
    ) {
      this.handleRegisterSetup();
    }

    alert('Form updated successfully!');
  }

  handleRegisterSetup() {
    // Show the register configuration modal
    return new Promise<void>((resolve) => {
      this.registerModal.show();

      // Listen for when the modal is hidden
      this.registerModalRef.nativeElement.addEventListener(
        'hidden.bs.modal',
        () => {
          resolve();
        },
        { once: true }
      );
    });
  }

  confirmRegister() {
    if (this.enableRegister) {
      this.formService.saveRegister(this.formConfig.id, {
        buttonText: this.registerButtonText,
        createdAt: new Date(),
        entries: [],
      });
    }

    this.registerModal.hide();
    this.showRegisterPrompt = false;
    alert('New form created successfully!');
  }

  createForm() {
    this.formConfig.id = this.formService.generateId();
    this.formConfig.createdAt = new Date();
    this.formConfig.version = 1;
    let payload = {
      ...this.formConfig,
      formVisibility:this.selectedCheckboxes
    }
    this.formService.saveForm(payload);

    // Always show register prompt for new forms
    this.handleRegisterSetup();

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
      formVisibility: [],
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

  setDropdownSelections(formVisibility: any[]) {
    if (!formVisibility || !formVisibility.length) return;
  
    this.selectedCheckboxes = [];
    
    formVisibility.forEach(item => {
      const key = Object.keys(item)[0] as 'LoginType' | 'Select Hospital';
      const options = item[key] as FormVisibilityOption[];
      const isPrintable = item.isPrintable !== false;
  
      if (!options || !options.length) return;
  
      // Create the storage data object with proper typing
      const storageData: FormVisibilityItem = {
        isPrintable
      } as FormVisibilityItem;
      
      // Initialize the dynamic key
      storageData[key] = [];
  
      const dropdownData = {
        label: key,
        options: [] as DropdownOption[],
        isPrintEnabled: isPrintable
      };
  
      options.forEach(opt => {
        if (key === 'LoginType') {
          const matched = this.loginType.find(lt => 
            lt.id === opt.id?.toString() || 
            lt.name?.toLowerCase() === opt.name?.toLowerCase()
          );
  
          if (matched) {
            dropdownData.options.push({
              name: matched.name,
              value: matched.id,
              dropdownId: this.dropdowns.find(d => d.label === key)?.dropdownId || 0
            });
  
            storageData[key].push({
              id: matched.id,
              name: matched.name
            });
          }
        }
        else if (key === 'Select Hospital') {
          const matched = this.hospitalList.find(h => 
            h.id === opt.id || 
            h.name?.toLowerCase() === opt.name?.toLowerCase()
          );
  
          if (matched) {
            dropdownData.options.push({
              name: matched.name,
              value: matched.id.toString(),
              dropdownId: this.dropdowns.find(d => d.label === key)?.dropdownId || 0
            });
  
            storageData[key].push({
              id: matched.id,
              name: matched.name
            });
          }
        }
      });
  
      if (dropdownData.options.length > 0) {
        this.selectedCheckboxes.push(storageData);
        this.onSelectionChanged([dropdownData]);
      }
    });
  }


  importForUpdate(form: FormConfig) {
    // Keep original ID for updating
    console.log(form)
    this.formConfig = JSON.parse(JSON.stringify(form));
    this.isExistingForm = true;
    this.originalFormId = form.id;
    this.isEditMode = true;
  // Reset dropdowns first
  this.selectedCheckboxes = [];
  
  // Auto-fill dropdowns if formVisibility exists
  if (form.formVisibility) {
    setTimeout(() => {
      this.setDropdownSelections(form.formVisibility);
    }, 100); // Small delay to ensure DOM is ready
  }
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
      'multi-checkbox': {
        options: [{ value: '', label: '' }],
        file: {
          accept: '*',
          multiple: false,
          maxSize: 5, // MB
        },
      },
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
