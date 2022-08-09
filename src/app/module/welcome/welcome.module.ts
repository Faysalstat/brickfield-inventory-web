import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRouteModule } from './welcome-route.module';
import { MaterialModule } from 'src/material.module';



@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRouteModule,
    MaterialModule
  ]
})
export class WelcomeModule { }
