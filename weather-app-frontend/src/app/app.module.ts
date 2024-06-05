import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonPrimeNgModule } from './common/common.module';
import { HomeComponent } from './home/home.component';
import { InvalidAccessComponent } from './invalid-access/invalid-access.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppLoadingSpinnerComponent } from './spinner/app-loading-spinner.component';
import { WeatherForcecastComponent } from './weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InvalidAccessComponent,
    LoginComponent,
    AppLoadingSpinnerComponent,
    WeatherForcecastComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonPrimeNgModule
  ],
  providers: [
    authInterceptorProviders,
    MessageService,
    ConfirmationService],
    schemas:[
      NO_ERRORS_SCHEMA,
      CUSTOM_ELEMENTS_SCHEMA
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
