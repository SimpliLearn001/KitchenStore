import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentForm!: FormGroup;
  amount:number=0;
  paymentMethod:string="";
  constructor(private orderService:OrderService,
    private userService:UserService,
     private router:Router) {
    this.orderService.getOrders().query.once('value',snap => {
      snap.forEach( order => {
        if(order.child("currentOrder").val() == true){
          this.amount = order.child("total").val();
        }
      })
    });
   }

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
      paymentMethod : new FormControl('gpay',)
    });
  }

  savePaymentMethod(){
    console.log("pmethod : ",this.paymentForm.get("paymentMethod")?.value);
    this.paymentMethod = this.paymentForm.get("paymentMethod")?.value
    let tempOrder:IOrder;
    this.orderService.getOrders().query.once('value',snap => {
      snap.forEach( order => {
        if(order.child("currentOrder").val() == true){
          tempOrder = order.val();
          tempOrder.paymentMethod = this.paymentMethod
          this.orderService.updateOrder(order.key,tempOrder);
        }
      })
    });
    this.router.navigate(["ordersummary"]);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["home/userlogin"]);
  }
}
