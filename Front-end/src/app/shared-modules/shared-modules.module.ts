import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';

import { ZoomImageComponent } from './zoom-image/zoom-image.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SearchComponent,
     ProductsListComponent,
     ProductDescriptionComponent,
     AccountComponent,
     CartComponent,
   
     ZoomImageComponent
    ],
  exports : [SearchComponent]
})
export class SharedModulesModule { }
