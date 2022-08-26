import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from 'src/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppAuthGuard } from './app-auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TooltipModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [AppAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
