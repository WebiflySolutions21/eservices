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
  patientId="1"
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
      this.formValues = { ...submission }; // Prefill form values
    }
    console.log(this.form)
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

  
  submitForm() {
    const payload = {
      formId: this.form.id,
      patientId: this.patientId,
      submission: this.formValues
    };

    // Save in localStorage
    const submissionKey = `form_submission_${this.form.id}_patient_${this.patientId}`;
    localStorage.setItem(submissionKey, JSON.stringify(payload));

    console.log('Submitted Form Values:', this.formValues);
    alert('Form saved locally for patient!');
  }
}
