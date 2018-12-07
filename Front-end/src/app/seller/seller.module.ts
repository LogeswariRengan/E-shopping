import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule,sellerComponents } from './seller-routing.module';
import {MatFormFieldModule} from '@angular/material';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,MatExpansionModule,
  MatCheckboxModule, MatIconModule,MatSelectModule, MatListModule,MatSliderModule,MatInputModule } from '@angular/material';
import { ViewProductComponent } from './view-product/view-product.component';



@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,  
    MatSelectModule,
    MatInputModule
  ],
  declarations: [sellerComponents, ViewProductComponent ]
})
export class SellerModule { }
