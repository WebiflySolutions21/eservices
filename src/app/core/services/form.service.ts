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
    try {
      const formsJson = localStorage.getItem(this.STORAGE_KEY);
      return formsJson ? JSON.parse(formsJson) : [];
    } catch (error) {
      console.error('Error parsing forms from localStorage', error);
      return [];
    }
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

  // Get count of all saved forms
  getFormsCount(): number {
    return this.getAllForms().length;
  }

  // Get recently created forms (optional)
  getRecentForms(limit: number = 5): FormConfig[] {
    const forms = this.getAllForms();
    return forms
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  // Existing registration form methods
  setRegistrationForm(formData: any) {
    this.registrationForm = formData;
  }

  getRegistrationForm() {
    return this.registrationForm;
  }

  // New method to clone a form (for import functionality)
  cloneForm(form: FormConfig): FormConfig {
    return {
      ...JSON.parse(JSON.stringify(form)),
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1
    };
  }
  // Add this to your FormService
formExists(id: string): boolean {
  return this.getAllForms().some(form => form.id === id);
}
// Add to your FormService
private readonly REGISTER_KEY = 'formRegisters';

saveRegister(formId: string, registerData: any): void {
  const registers = this.getAllRegisters();
  registers[formId] = registerData;
  localStorage.setItem(this.REGISTER_KEY, JSON.stringify(registers));
}

getRegister(formId: string): any {
  const registers = this.getAllRegisters();
  return registers[formId] || null;
}

getAllRegisters(): { [key: string]: any } {
  const registersJson = localStorage.getItem(this.REGISTER_KEY);
  return registersJson ? JSON.parse(registersJson) : {};
}

formHasRegister(formId: string): boolean {
  return !!this.getRegister(formId);
}
}