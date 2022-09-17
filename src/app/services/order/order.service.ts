import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IOrder } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders:AngularFireList<IOrder>;
  ref:any;
  constructor(private fireDataBase:AngularFireDatabase) { 
    this.orders = this.fireDataBase.list('orders');
  }
  getReference(){
    return this.ref;
  }
  getOrders(){
    return this.orders;
  }

  addOrder(order:IOrder){
    this.orders.push(order);
  }

  updateOrder($key:any,order:IOrder){
    this.orders.update($key,order);
  }
}
