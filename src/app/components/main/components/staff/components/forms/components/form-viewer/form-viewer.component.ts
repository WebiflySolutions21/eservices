import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-viewer',
  templateUrl: './form-viewer.component.html',
  styleUrls: ['./form-viewer.component.scss']
})
export class FormViewerComponent implements OnInit {
  form: any;
  formValues: { [key: string]: any } = {};
  patientId = "1";
  uploadedFiles: { [key: string]: File[] } = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const stored = localStorage.getItem('dynamicForms');
    if (stored) {
      const forms = JSON.parse(stored);
      this.form = forms.find((f: any) => f.id === id);
    }
    
    // Load existing submission if available
    const submissionKey = `form_submission_${id}_patient_${this.patientId}`;
    const savedSubmission = localStorage.getItem(submissionKey);
    if (savedSubmission) {
      const { submission } = JSON.parse(savedSubmission);
      this.formValues = { ...submission };
    }
  }

  onFileChange(event: any, field: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Validate file size if specified
      if (field.maxSize) {
        const maxBytes = field.maxSize * 1024 * 1024;
        for (let file of files) {
          if (file.size > maxBytes) {
            alert(`File ${file.name} exceeds maximum size of ${field.maxSize}MB`);
            event.target.value = ''; // Clear selection
            return;
          }
        }
      }
      
      // Store files in form values
      if (field.multiple) {
        this.formValues[field.id] = Array.from(files);
      } else {
        this.formValues[field.id] = files[0];
      }
    }
  }

  removeFile(field: any, fileToRemove?: File) {
    if (field.multiple && fileToRemove) {
      const files = this.formValues[field.id] as File[];
      this.formValues[field.id] = files.filter(file => file !== fileToRemove);
    } else {
      this.formValues[field.id] = null;
      // Reset file input
      const input = document.getElementById(field.id) as HTMLInputElement;
      if (input) input.value = '';
    }
  }

  onMultiCheckboxChange(event: Event, fieldId: string) {
    const checkbox = event.target as HTMLInputElement;
    if (!this.formValues[fieldId]) {
      this.formValues[fieldId] = [];
    }

    if (checkbox.checked) {
      this.formValues[fieldId].push(checkbox.value);
    } else {
      this.formValues[fieldId] = this.formValues[fieldId].filter(
        (val: string) => val !== checkbox.value
      );
    }
  }

  async submitForm() {
    // Prepare form data for submission
    const formData = new FormData();
    
    // Add regular fields
    for (const key in this.formValues) {
      const value = this.formValues[key];
      
      if (value instanceof File) {
        // Single file
        formData.append(key, value);
      } else if (Array.isArray(value) && value[0] instanceof File) {
        // Multiple files
        for (let i = 0; i < value.length; i++) {
          formData.append(`${key}_${i}`, value[i]);
        }
      } else {
        // Regular field values
        formData.append(key, JSON.stringify(value));
      }
    }
    
    // Add metadata
    formData.append('formId', this.form.id);
    formData.append('patientId', this.patientId);

    try {
      // Here you would typically send to your API
      // For now we'll just save to localStorage
      const submissionKey = `form_submission_${this.form.id}_patient_${this.patientId}`;
      
      // Create a submission object without files (since we can't store them in localStorage)
      const submissionWithoutFiles: { [key: string]: any } = {};
      for (const key in this.formValues) {
        if (!(this.formValues[key] instanceof File) && !Array.isArray(this.formValues[key])) {
          submissionWithoutFiles[key] = this.formValues[key];
        }
      }
      
      localStorage.setItem(submissionKey, JSON.stringify({
        formId: this.form.id,
        patientId: this.patientId,
        submission: submissionWithoutFiles
      }));

      console.log('Form submission prepared:', formData);
      alert('Form data prepared for submission (files not saved to localStorage)');
      
      // In a real app, you would send to your API:
      // const response = await this.http.post('/api/submit-form', formData).toPromise();
      // console.log('Submission successful:', response);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  }
}