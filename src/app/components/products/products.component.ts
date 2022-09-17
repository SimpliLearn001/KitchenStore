import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products:IProduct[]=[];
  constructor(private productService:ProductService, 
              private cartService:CartService,
              private userService:UserService,
              private router:Router) { 
    this.productService.getProducts().snapshotChanges().forEach(productsSnapshot =>{
      this.products = []
      productsSnapshot.forEach(productSnapshot =>{
        let product = productSnapshot.payload.toJSON();
        this.products.push(product as IProduct);
      });
    });
  }

  ngOnInit(): void {
  }

  addProductToCart(product:any){
    this.cartService.addProductToCart(product);
    let addEle = document.getElementById("Add"+product.id);
    addEle?.setAttribute("hidden","true");
    let RemoveEle = document.getElementById("Remove"+product.id);
    RemoveEle?.removeAttribute("hidden");
  }

  removeProductFromCart(product:any){
    this.cartService.getProductsFromCart().snapshotChanges().forEach(cartSnapshot =>{
      cartSnapshot.forEach(cartItem =>{
        if(cartItem.payload.child("id").val() === product.id){
          this.cartService.deleteProductFromCart(cartItem.key);
        }
      });
    });
    let addEle = document.getElementById("Add"+product.id);
    addEle?.removeAttribute("hidden");
    let RemoveEle = document.getElementById("Remove"+product.id);
    RemoveEle?.setAttribute("hidden","true");
  }

  logout(){
    this.userService.logout();
    this.router.navigate(["home/userlogin"]);
  }
}
