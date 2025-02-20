import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitlesRoutingModule } from './titles-routing.module';
import { TitlesComponent } from './titles.component';


@NgModule({
  declarations: [
    TitlesComponent
  ],
  imports: [
    CommonModule,
    TitlesRoutingModule
  ]
})
export class TitlesModule { }
