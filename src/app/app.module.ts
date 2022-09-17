import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireStorageModule} from 'angularfire2/storage';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrdersummaryComponent } from './components/ordersummary/ordersummary.component';
import { AdminService } from './services/admin/admin.service';
import { UserService } from './services/user/user.service';
import { ProductService } from './services/product/product.service';
import { CartService } from './services/cart/cart.service';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomechildpageComponent } from './components/homechildpage/homechildpage.component';
import { environment } from 'src/environments/environment';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';


@NgModule({ 
  declarations: [
    AppComponent,
    HomeComponent,
    UserloginComponent,
    AdminloginComponent,
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    PaymentComponent,
    OrdersummaryComponent,
    ProductDetailsComponent,
    HomechildpageComponent,
    ManageProductsComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [AdminService,UserService,ProductService,CartService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
