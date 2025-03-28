import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTemplateComponent } from './components/input-template/input-template.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { PrescriptionTableComponent } from './components/prescription-table/prescription-table.component';
import { PrintPreviewComponent } from './components/print-preview/print-preview.component';


@NgModule({
  declarations: [...fromComponents.components,InputTemplateComponent, PrescriptionTableComponent, PrintPreviewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDropdown
  ],
  exports:[...fromComponents.components,InputTemplateComponent]
})
export class SharedModule { }
