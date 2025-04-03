import { Injectable } from '@angular/core';
import { FormConfig } from '@assets/constants/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private registrationForm: any;
  private readonly STORAGE_KEY = 'dynamicForms';

  constructor() {
    this.registrationForm = null;

   }

  // Save form to localStorage
  saveForm(form: FormConfig): void {
    const forms = this.getAllForms();
    const existingIndex = forms.findIndex(f => f.id === form.id);
    
    if (existingIndex >= 0) {
      // Update existing form
      forms[existingIndex] = {
        ...form,
        updatedAt: new Date(),
        version: forms[existingIndex].version + 1
      };
    } else {
      // Add new form
      forms.push({
        ...form,
        createdAt: new Date(),
        updatedAt: new Date(),
        version: 1
      });
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(forms));
  }

  // Get all forms
  getAllForms(): FormConfig[] {
    const formsJson = localStorage.getItem(this.STORAGE_KEY);
    return formsJson ? JSON.parse(formsJson) : [];
  }

  // Get form by ID
  getFormById(id: string): FormConfig | undefined {
    const forms = this.getAllForms();
    return forms.find(form => form.id === id);
  }

  // Delete form by ID
  deleteForm(id: string): void {
    const forms = this.getAllForms().filter(form => form.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(forms));
  }

  // Generate a new form ID
  generateId(): string {
    return 'form_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  setRegistrationForm(formData: any) {
    this.registrationForm = formData;
  }

  getRegistrationForm() {
    return this.registrationForm;
  }
}

