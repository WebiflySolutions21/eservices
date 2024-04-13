import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromServices from './services'
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[...fromServices.services]
})

export class CoreModule { }
