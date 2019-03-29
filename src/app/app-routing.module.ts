import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AddProductComponent } from './products/add/add.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { AuthGuard } from './core/authGuard/authentication.guard';

const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path: 'products/add', canActivate: [AuthGuard], component: AddProductComponent},
  {path: 'products/:id/edit', canActivate: [AuthGuard], component: AddProductComponent},
  {path: 'products/list', canActivate: [AuthGuard], component: ListProductsComponent},
  {path: '**', component: AuthenticationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
