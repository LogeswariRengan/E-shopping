import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { RoleGuard } from '../auth/role.guard';

const routes: Routes = [
  { path: '', component: AdminHomeComponent ,canActivate:[RoleGuard]  ,data:{expectedRole:'admin'}  },
  // { path: '', component: AddNewProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
export const adminComponents = [AdminHomeComponent, AddNewProductComponent];
