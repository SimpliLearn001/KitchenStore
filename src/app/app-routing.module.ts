import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { HomechildpageComponent } from './components/homechildpage/homechildpage.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { OrdersummaryComponent } from './components/ordersummary/ordersummary.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { AdminAuthGuard } from './gaurds/admin-auth.guard';
import { AuthGuard } from './gaurds/auth.guard';

const routes: Routes = [
  {path:'home', component:HomeComponent,children:[
    {path:'',component:HomechildpageComponent},
    {path:'userlogin', component:UserloginComponent},
    {path:'adminlogin', component:AdminloginComponent},
  ]},
  {path:'products',component:ProductsComponent,canActivate:[AuthGuard], children:[
    {path:'product-details', component:ProductDetailsComponent}
  ]},
  {path:'cart', component:CartComponent, canActivate:[AuthGuard], children:[
    {path:'product-details', component:ProductDetailsComponent}
  ]},
  {path:'checkout', component:CheckoutComponent, canActivate:[AuthGuard]},
  {path:'payment', component:PaymentComponent, canActivate:[AuthGuard]},
  {path:'ordersummary', component:OrdersummaryComponent, canActivate:[AuthGuard]},
  {path:'manage-products', component:ManageProductsComponent,canActivate:[AdminAuthGuard], children:[
    {path:'add-product', component:AddProductComponent}
  ]},
  {path:'**', redirectTo:"/home" , pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
