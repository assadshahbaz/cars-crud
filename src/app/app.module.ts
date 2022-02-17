import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandsListComponent } from './components/brands-list/brands-list.component';
import { BasicService } from './utils/basic.service';
import { HttpConfig } from './utils/http.interceptor';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    BrandsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    BasicService,
    { multi: true, provide: HTTP_INTERCEPTORS, useClass: HttpConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
