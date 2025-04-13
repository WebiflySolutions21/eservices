import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ConfigurationsComponent } from './configurations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {FormBuilderComponent} from "./form-builder/form-builder.component"
import {DynamicFormComponent} from "./dynamic-form/dynamic-form.component"
@NgModule({
  declarations: [
    ConfigurationsComponent,
    FormBuilderComponent,
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    DragDropModule
] 
})
export class ConfigurationsModule { }
