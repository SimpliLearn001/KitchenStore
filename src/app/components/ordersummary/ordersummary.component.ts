import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.scss']
})
export class OrdersummaryComponent implements OnInit {

  myOrder!:IOrder;
  constructor(private orderService:OrderService,
    private userService:UserService,
     private router:Router) {
    this.orderService.getOrders().query.once('value',snap => {
      snap.forEach( order => {
        if(order.child("currentOrder").val() == true){
          this.myOrder = order.val();
        }
      })
    });
   }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["home/userlogin"]);
  }
}
