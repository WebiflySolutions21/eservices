import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ConfigurationsComponent } from './configurations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    ConfigurationsComponent,
    
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
