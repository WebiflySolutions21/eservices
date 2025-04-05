import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { FormViewerComponent } from './components/form-viewer/form-viewer.component'; 
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FormsComponent,
    FormViewerComponent
  ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    AngularFormsModule,
    SharedModule
  ]
})
export class FormsModule { }
