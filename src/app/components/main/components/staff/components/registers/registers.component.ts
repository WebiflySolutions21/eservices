import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/core/services';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})
export class RegistersComponent implements OnInit {
  registers: any[] = [];
  formTitles: { [key: string]: string } = {};

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.loadRegisters();
  }

  loadRegisters() {
    const allForms = this.formService.getAllForms();
    const allRegisters = this.formService.getAllRegisters();
    
    // Create mapping of form IDs to titles
    this.formTitles = allForms.reduce((acc, form) => {
      acc[form.id] = form.title;
      return acc;
    }, {} as { [key: string]: string });
    
    // Prepare registers data
    this.registers = Object.entries(allRegisters).map(([formId, registerData]) => {
      return {
        formId,
        formTitle: this.formTitles[formId] || 'Unknown Form',
        buttonText: registerData.buttonText,
        entryCount: registerData.entries?.length || 0,
        lastUpdated: registerData.lastUpdated || registerData.createdAt
      };
    });
  }
}