import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  forms: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('dynamicForms');
    if (stored) this.forms = JSON.parse(stored);
  }

  openForm(formId: string) {
    this.router.navigate(['/main/staff/forms/view', formId]);
  }
  
}
