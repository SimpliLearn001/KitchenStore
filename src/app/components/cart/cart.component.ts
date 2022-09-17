import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItem!: IProduct;
  cart: IProduct[] = [];
  constructor(private cartService: CartService,
    private userService: UserService,
    private router: Router) {
    this.getCart();
  }

  ngOnInit(): void {

  }
  getCart() {
    this.cartService.getProductsFromCart().snapshotChanges().forEach(cartSnapshot => {
      this.cart = [];
      cartSnapshot.forEach(cartItem => {
        let item: any = cartItem.payload.toJSON();
        this.cart.push(item as IProduct);
      });
    });
  }
  removeCartItem(id: any) {
    this.cartService.getProductsFromCart().snapshotChanges().forEach(cartSnapshot => {
      cartSnapshot.forEach(cartItem => {
        if (cartItem.payload.child("id").val() === id) {
          this.cartService.deleteProductFromCart(cartItem.key);
        }
      });
    });

  }
  logout() {
    this.userService.logout();
    this.router.navigate(["home/userlogin"]);
  }

}
