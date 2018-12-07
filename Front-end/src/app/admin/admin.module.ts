import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminComponents } from './admin-routing.module';
import { AdminRoutingModule } from './admin-routing.module';
import {MatCardModule} from '@angular/material/card';
import { MDBBootstrapModule} from 'angular-bootstrap-md';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,MDBBootstrapModule
    
  ],
  declarations: [
    adminComponents
  ]
})
export class AdminModule { }
