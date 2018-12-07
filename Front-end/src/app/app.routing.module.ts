import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CartComponent} from './shared-modules/cart/cart.component'
import { AuthGuard } from './auth/auth.guard';

import { ProductsListComponent} from './shared-modules/products-list/products-list.component'
import {PageNotFoundComponent} from '../app/page-not-found/page-not-found.component';
import {ProductDescriptionComponent} from './shared-modules/product-description/product-description.component'
import {AccountComponent} from '../app/shared-modules/account/account.component'
 

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    
    {path : 'products-list/:product-type' , component : ProductsListComponent},
    {path : 'prodDesc/:product-id',component : ProductDescriptionComponent},
    { path: 'adminHome', loadChildren: "../app/admin/admin.module#AdminModule"   },
    {path : 'sellerHome',loadChildren : "../app/seller/seller.module#SellerModule"},
    {path : 'account',component:AccountComponent,canActivate: [AuthGuard]},
    {path : '**',component : PageNotFoundComponent}
  

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            { enableTracing: true })
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [HomeComponent,AccountComponent, CartComponent,ProductDescriptionComponent,ProductsListComponent];