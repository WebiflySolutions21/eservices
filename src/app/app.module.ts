import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import { LandingComponent } from './components/landing/landing.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ErrorInterceptor,TokenInterceptor} from "./core/interceptors"
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
