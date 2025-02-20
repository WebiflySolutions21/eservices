import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTemplateComponent } from './components/input-template/input-template.component';


@NgModule({
  declarations: [...fromComponents.components,InputTemplateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[...fromComponents.components,InputTemplateComponent]
})
export class SharedModule { }
