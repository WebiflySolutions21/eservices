import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintPageRoutingModule } from './print-page-routing.module';
import { PrintPageComponent } from './print-page.component';
import { SharedModule } from "../../../../../../shared/shared.module";


@NgModule({
  declarations: [
    PrintPageComponent
  ],
  imports: [
    CommonModule,
    PrintPageRoutingModule,
    SharedModule
]
})
export class PrintPageModule { }
