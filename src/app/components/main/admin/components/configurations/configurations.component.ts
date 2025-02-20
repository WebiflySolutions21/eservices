import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IFormValueData } from '@assets/constants/app.constants';
@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
})
export class ConfigurationsComponent implements OnInit {
  dynamicForm: FormGroup;
  isPreviewOpen: boolean = false;
  previewForm: any = null; // Holds form data for preview
  dragging=false
  isOver=false
  jsonObs$ = new BehaviorSubject<any>(null)
  formValueObs$ = new BehaviorSubject<IFormValueData>({
    isSubmit:false,
    isPreload:false,
    data:null
  })

  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: any = {};
  inputTypes = [
    { value: 'text', label: 'Text', placeholder: 'Enter text here' },
    { value: 'password', label: 'Password', placeholder: 'Enter your password' },
    { value: 'email', label: 'Email', placeholder: 'Enter your email' },
    { value: 'number', label: 'Number', placeholder: 'Enter a number' },
    { value: 'datetime', label: 'Date', placeholder: '' },
    { value: 'file', label: 'File', placeholder: '' },
    { value: 'checkbox', label: 'Checkbox', placeholder: '' },
    { value: 'radio', label: 'Radio', placeholder: '' },
  ];

  constructor(private fb: FormBuilder,private router:Router) {
    this.dynamicForm = this.fb.group({
      title: ['', Validators.required], // Universal Title
      description: ['', Validators.required], // Universal Description
      buttonTitle: ['Submit', Validators.required], // Universal Button Title
      fields: this.fb.array([]) // FormArray for Dynamic Fields
    });
  }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Staff',path:"/staff" },
      { item_id: 2, item_text: 'Doctor',path:"/doctor" },
      { item_id: 3, item_text: 'Reception' ,path:"/reception"},
      { item_id: 4, item_text: 'Opthalmologist',path:"/opthal" },
      { item_id: 5, item_text: 'Medical',path:"/medical" },
      { item_id: 6, item_text: 'Lab' ,path:"/lab"}
    ];

    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };

    this.addField(); // Add one field initially
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item.path);
    console.log("Updated Selected Paths:", this.selectedItems);
  }
  
  onDeSelect(item: any) {
    this.selectedItems = this.selectedItems.filter(path => path !== item.path);
    console.log("Updated Selected Paths:", this.selectedItems);
  }


  // Getter for FormArray
  get fields(): FormArray {
    return this.dynamicForm.get('fields') as FormArray;
  }

  addField() {
    const fieldGroup = this.fb.group({
      title: ['', Validators.required], // Section title
      description: ['', Validators.required], // Section description
      label: ['', Validators.required], // Field label
      type: ['text', Validators.required], // Input type
      placeholder: [''], // Placeholder text
      defaultValue: [''], // Default value
      required: [false] // Required field checkbox
    });

    this.fields.push(fieldGroup);
  }

  // Remove a field from the FormArray
  removeField(index: number) {
    this.fields.removeAt(index);
  }

  openPreview() {
    console.log(this.dynamicForm.value);
  
    // Transform form data to API format
    this.previewForm = this.transformFormToApiFormat(this.dynamicForm.value);
    this.jsonObs$.next(this.previewForm)
    console.log(this.previewForm)
  
    // Open the preview modal
    this.isPreviewOpen = true;
  }
  
  // Function to transform form data to API format
  transformFormToApiFormat(formData: any) {
    let sections: any[] = [];
  
    formData.fields.forEach((field: any) => {
      let fieldData = {
        type: field.type,
        label: field.label,
        subLabel: field.description || "",
        apiKey: this.generateApiKey(field.label),
        default: field.defaultValue || "",
        placeholder: field.placeholder || "",
        info: "",
        validations: {
          required: { val: field.required ? 1 : 0, msg: "" }
        },
        extra: { uploadApi: "" },
        isRequired: field.required
      };
  
      // If the field has title and description, wrap it inside a section
      if (field.title && field.description) {
        sections.push({
          id: this.generateApiKey(field.title),
          title: field.title,
          description: field.description,
          piFields: [fieldData], // Place the field inside the section
          sectionCta: {
            label: formData.buttonTitle,
            showCta: true
          }
        });
      } else {
        // Otherwise, push directly to the main section's piFields
        if (sections.length === 0) {
          sections.push({
            id: "dynamicFormConfig",
            title: formData.title,
            description: formData.description,
            piFields: [],
            sectionCta: {
              label: formData.buttonTitle,
              showCta: true
            }
          });
        }
        sections[0].piFields.push(fieldData);
      }
    });
  
    return {
      loginType:this.selectedItems,
      mainTitle: formData.title,
      mainDesc: formData.description,
      buttonTitle: formData.buttonTitle,
      sections: sections,
      hideSectionHeader: false,
      isSubmit: true
    };
  }
  
  
  // Function to generate API key dynamically from label
  generateApiKey(label: string): string {
    return label
      .toLowerCase()
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .replace(/[^a-z0-9_]/g, ""); // Remove special characters
  }
  

  closePreview() {
    this.isPreviewOpen = false;
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    if (event.previousIndex !== event.currentIndex) {
      const formArray = this.fields;
      const item = formArray.at(event.previousIndex);
      formArray.removeAt(event.previousIndex);
      formArray.insert(event.currentIndex, item);
    }
    console.log("Updated Form Sequence:", this.dynamicForm.value.fields);
  }
  

  // drop(event: CdkDragDrop<any[]>) {
  //   const fieldsArray = this.dynamicForm.get('fields') as FormArray;
  
  //   // Get the current form values
  //   const fieldValues = fieldsArray.value;
  
  //   // Swap items in the form values array
  //   moveItemInArray(fieldValues, event.previousIndex, event.currentIndex);
  
  //   // Reset the FormArray with new order
  //   fieldsArray.clear();
  //   fieldValues.forEach((field:any) => {
  //     fieldsArray.push(this.fb.group(field));
  //   });
  
  //   console.log("Updated Form Sequence:", this.dynamicForm.value.fields);
  // }
  
  submitForm() {
    // let selectedItem=this.selectedItems.filter(item=>item!=null|| undefined)
    // const submittedData = {
    //   loginType:selectedItem,
    //   formTitle: this.dynamicForm.value.title,
    //   formDescription: this.dynamicForm.value.description,
    //   buttonTitle: this.dynamicForm.value.buttonTitle,
    //   formSequence: this.dynamicForm.value.fields, // Always updated order
    // };
    const submittedData = this.transformFormToApiFormat(this.dynamicForm.value);
    localStorage.setItem("submittedForm", JSON.stringify(submittedData));
    this.router.navigate(["/main/admin/doctor"],{queryParams:{loginType:"/doctor"}});
    console.log("Final Submitted Form Data:", submittedData);
  }
  
  resize(event: MouseEvent, index: number) {
    event.preventDefault();
  
    // Get the input element
    const resizer = event.target as HTMLElement;
    const inputElement = resizer.parentElement?.querySelector('input, textarea') as HTMLElement;
  
    if (!inputElement) return;
  
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = inputElement.offsetWidth;
    const startHeight = inputElement.offsetHeight;
  
    // Function to update width & height dynamically
    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
  
      inputElement.style.width = `${newWidth}px`;
      inputElement.style.height = `${newHeight}px`;
    };
  
    // Cleanup event listeners on mouse release
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
