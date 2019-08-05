import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomeService } from './service/home.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,   
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,   
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
    DeviceDetectorModule.forRoot()
  ],
  exports:[],
  providers: [
    HomeService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}