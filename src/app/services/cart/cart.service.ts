import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IProduct } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:AngularFireList<IProduct>;
  constructor(private fireDataBase:AngularFireDatabase) {
    this.cartItems = this.fireDataBase.list('cart');
    // this.testDB();
  }
 
  getProductsFromCart(){
    return this.cartItems;
  }

  getProductFromCartById(id:number):IProduct{
    console.log("g");
    let cartItem:any;
    this.cartItems.snapshotChanges().forEach(cartItemsSnapshot =>{
      cartItemsSnapshot.forEach(item =>{
        console.log("id" + item.payload.child("id").val())
        if(item.payload.child("id").val() == id){
          cartItem = item.payload.toJSON();
        }
      })
    });
    return cartItem;
  }

  addProductToCart(product:IProduct){
    // this.cart.push(product);
    this.cartItems.push(product);
  }

  deleteProductFromCart($key:any){
    this.cartItems.remove($key);
  }

  testDB(){
    console.log("testDB - cart :")
    this.fireDataBase.list("cart").query.once('value',function(snap){
      snap.forEach( childSnap => {
        console.log("Value: ",childSnap.val());
        console.log("Key: ",childSnap.key);
      });
    })
  }
}
