import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/models/order';
import { IProduct } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartItem!: IProduct;
  cart:IProduct[] = [];
  
  amount:number = 0;
  address:string="";
  addressForm!: FormGroup;
  keys:string[]=[];
  // currentOrder:boolean=true;
  constructor(private cartService:CartService,
    private orderService:OrderService,
    private userService:UserService,
    private router:Router) {
    this.getCart();
    this.totalSum();
    this.changeAllCurrentOrderValues();
   }

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      address : new FormControl('',Validators.required)
    });
  }
  getCart(){
    this.cartService.getProductsFromCart().snapshotChanges().forEach(cartSnapshot =>{
      this.cart = [];
      cartSnapshot.forEach(cartItem =>{
        let item:any = cartItem.payload.toJSON();
        this.cart.push(item as IProduct);
      });
    });
  }
  totalSum(){
    this.cartService.getProductsFromCart().snapshotChanges().forEach(cartSnapshot =>{
      cartSnapshot.forEach(cartItem =>{
        let item:any = cartItem.payload.toJSON();
        this.amount += item.price;
      });
    });
  }

  saveAddress(){
    this.address = this.addressForm.get("address")?.value
    let addressEle = document.getElementById("address");
    addressEle?.setAttribute("hidden","true");
    let addressButtonEle = document.getElementById("addressButton");
    addressButtonEle?.setAttribute("hidden","true");

    let addressSaveEle = document.getElementById("showSavedAddress");
    addressSaveEle?.removeAttribute("hidden");

    if(addressSaveEle) {
      addressSaveEle.innerText = this.address; 
    }
  }

  createOrder(){
    
    let order:any={
      products: [{
        title:'',
        price:0
      }],
      total: 0,
      address: '',
      paymentMethod: '',
      currentOrder: false
    };
    this.cart.forEach(item =>{
        order.products.push({title:item["title"],price:item["price"]});
    });
      order.total = this.amount;
      order.address = this.address;
      order.currentOrder = true;
      console.log("order : " + order);
      this.orderService.addOrder(order);

      this.router.navigate(['payment']);
  
    }

    changeAllCurrentOrderValues(){
      let tempOrder:IOrder;
      this.orderService.getOrders().query.once('value',snap => {
        snap.forEach( order => {
          console.log("Key: ",order.key);
          console.log("Value: ",order.val());
          tempOrder = order.val();
          tempOrder.currentOrder = false;
          this.orderService.updateOrder(order.key,tempOrder);
        })
      });
    }

    logout() {
      this.userService.logout();
      this.router.navigate(["home/userlogin"]);
    }
}
