import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AddProductComponent } from './add-product/add-product.component';

import { RoleGuard } from '../auth/role.guard';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  { path: '', component: SellerHomeComponent, canActivate: [RoleGuard], data: { expectedRole: 'seller' },children :[
    { path: 'add-product', component: AddProductComponent, canActivate: [RoleGuard], data: { expectedRole: 'seller' }},
    { path : 'view-product',component:ViewProductComponent,canActivate :[RoleGuard], data: { expectedRole: 'seller' } }
  ]}
  



  // { path: '', component: AddNewProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
export const sellerComponents = [SellerHomeComponent, AddProductComponent];
