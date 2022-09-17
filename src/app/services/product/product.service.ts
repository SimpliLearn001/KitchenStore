import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/models/product';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // products:IProduct[] =[
  //   {
  //     id: 1 ,
  //     title: "Brown eggs",
  //     type: "dairy",
  //     description: "Raw organic brown eggs in a basket",
  //     price: 28.1,
  //     rating: 4
  //   }, {
  //     id: 2 ,
  //     title: "Sweet fresh stawberry",
  //     type: "fruit",
  //     description: "Sweet fresh stawberry on the wooden table",
  //     price: 29.45,
  //     rating: 4
  //   }, {
  //     id: 3 ,
  //     title: "Asparagus",
  //     type: "vegetable",
  //     description: "Asparagus with ham on the wooden table",
  //     price: 18.95,
  //     rating: 3
  //   }, {
  //     id: 4 ,
  //     title: "Green smoothie",
  //     type: "dairy",
  //     description: "Glass of green smoothie with quail egg's yolk, served with cocktail tube, green apple and baby spinach leaves over tin surface.",
  //     price: 17.68,
  //     rating: 4
  //   }, {
  //     id: 5 ,
  //     title: "Raw legums",
  //     type: "vegetable",
  //     description: "Raw legums on the wooden table",
  //     price: 17.11,
  //     rating: 2
  //   }, {
  //     id: 6 ,
  //     title: "Baking cake",
  //     type: "dairy",
  //     description: "Baking cake in rural kitchen - dough  recipe ingredients (eggs, flour, sugar) on vintage wooden table from above.",
  //     price: 11.14,
  //     rating: 4
  //   }, {
  //     id: 7 ,
  //     title: "Pesto with basil",
  //     type: "vegetable",
  //     description: "Italian traditional pesto with basil, chesse and oil",
  //     price: 18.19,
  //     rating: 2
  //   }, {
  //     id: 8 ,
  //     title: "Hazelnut in black ceramic bowl",
  //     type: "vegetable",
  //     description: "Hazelnut in black ceramic bowl on old wooden background. forest wealth. rustic style. selective focus",
  //     price: 27.35,
  //     rating: 0
  //   }, {
  //     id: 9 ,
  //     title: "Fresh stawberry",
  //     type: "fruit",
  //     description: "Sweet fresh stawberry on the wooden table",
  //     price: 28.59,
  //     rating: 4
  //   }, {
  //     id: 10 ,
  //     title: "Lemon and salt",
  //     type: "fruit",
  //     description: "Rosemary, lemon and salt on the table",
  //     price: 15.79,
  //     rating: 5
  //   }, {
  //     id: 11 ,
  //     title: "Homemade bread",
  //     type: "bakery",
  //     description: "Homemade bread",
  //     price: 17.48,
  //     rating: 3
  //   }, {
  //     id: 12 ,
  //     title: "Legums",
  //     type: "vegetable",
  //     description: "Cooked legums on the wooden table",
  //     price: 14.77,
  //     rating: 0
  //   }, {
  //     id: 13 ,
  //     title: "Fresh tomato",
  //     type: "vegetable",
  //     description: "Fresh tomato juice with basil",
  //     price: 16.3,
  //     rating: 2
  //   }, {
  //     id: 14 ,
  //     title: "Healthy breakfast",
  //     type: "fruit",
  //     description: "Healthy breakfast set. rice cereal or porridge with berries and honey over rustic wood background",
  //     price: 13.02,
  //     rating: 2
  //   }, {
  //     id: 15 ,
  //     title: "Green beans",
  //     type: "vegetable",
  //     description: "Raw organic green beans ready to eat",
  //     price: 28.79,
  //     rating: 1
  //   }, {
  //     id: 16 ,
  //     title: "Baked stuffed portabello mushrooms",
  //     type: "bakery",
  //     description: "Homemade baked stuffed portabello mushrooms with spinach and cheese",
  //     price: 20.31,
  //     rating: 1
  //   }, {
  //     id: 17 ,
  //     title: "Strawberry jelly",
  //     type: "fruit",
  //     description: "Homemade organic strawberry jelly in a jar",
  //     price: 14.18,
  //     rating: 1
  //   }, {
  //     id: 18 ,
  //     title: "Pears juice",
  //     type: "fruit",
  //     description: "Fresh pears juice on the wooden table",
  //     price: 19.49,
  //     rating: 4
  //   }, {
  //     id: 19 ,
  //     title: "Fresh pears",
  //     type: "fruit",
  //     description: "Sweet fresh pears on the wooden table",
  //     price: 15.12,
  //     rating: 5
  //   }, {
  //     id: 20 ,
  //     title: "Caprese salad",
  //     type: "vegetable",
  //     description: "Homemade healthy caprese salad with tomato mozzarella and basil",
  //     price: 16.76,
  //     rating: 5
  //   }, {
  //     id: 21 ,
  //     title: "Oranges",
  //     type: "fruit",
  //     description: "Orange popsicle ice cream bars made from fresh oranges.  a refreshing summer treat.",
  //     price: 21.48,
  //     rating: 4
  //   }, {
  //     id: 22 ,
  //     title: "Vegan food",
  //     type: "vegetable",
  //     description: "Concept of vegan food",
  //     price: 29.66,
  //     rating: 4
  //   }, {
  //     id: 23 ,
  //     title: "Breakfast with muesli",
  //     type: "dairy",
  //     description: "Concept of healthy breakfast with muesli",
  //     price: 22.7,
  //     rating: 2
  //   }, {
  //     id: 24 ,
  //     title: "Honey",
  //     type: "bakery",
  //     description: "Honey and honeycell on the table",
  //     price: 17.01,
  //     rating: 2
  //   }, {
  //     id: 25 ,
  //     title: "Breakfast with cottage",
  //     type: "fruit",
  //     description: "Healthy breakfast with cottage cheese and strawberry",
  //     price: 14.05,
  //     rating: 1
  //   }, {
  //     id: 26 ,
  //     title: "Strawberry smoothie",
  //     type: "fruit",
  //     description: "Glass of red strawberry smoothie with chia seeds, served with retro cocktail tube, fresh mint and strawberries over dark background",
  //     price: 28.86,
  //     rating: 2
  //   }, {
  //     id: 27 ,
  //     title: "Strawberry and mint",
  //     type: "fruit",
  //     description: "Homemade muesli with strawberry and mint",
  //     price: 26.21,
  //     rating: 4
  //   }, {
  //     id: 28 ,
  //     title: "Ricotta",
  //     type: "dairy",
  //     description: "Ricotta with berry and mint",
  //     price: 27.81,
  //     rating: 5
  //   }, {
  //     id: 29 ,
  //     title: "Cuban sandwiche",
  //     type: "bakery",
  //     description: "Homemade traditional cuban sandwiches with ham pork and cheese",
  //     price: 18.5,
  //     rating: 4
  //   }, {
  //     id: 30 ,
  //     title: "Granola",
  //     type: "dairy",
  //     description: "Glass jar with homemade granola and yogurt with nuts, raspberries and blackberries on wooden cutting board over white textile in day light",
  //     price: 29.97,
  //     rating: 3
  //   }
  // ]
  productItems:AngularFireList<IProduct>;
  constructor(private firedatabase:AngularFireDatabase) {
    this.productItems = this.firedatabase.list('products');
    // this.products.forEach(product => this.productItems.push(product));
  }

  // getProducts(){
  //   return this.products;
  // }

  // getProductById(id:number):IProduct | null {
  //   let product = this.products.filter(product => product.id === id)[0];
  //   return product ? product : null;
  // }

  // addProduct(product:IProduct){
  //   this.products.push(product);
  // }

  // deleteProductById(id:number){
  //   let product = this.getProductById(id);
  //   if(product) this.products.splice(id-1,1);
  // }

  // updateProduct(product:IProduct){
  //   let checkprod = this.getProductById(product.id);
  //   if(checkprod) this.products.push(product);
  // }

  getProducts(){
    return this.productItems;
  }

  addProduct(product:IProduct){
    this.productItems.push(product);
  }

  updateProduct($key:any,product:IProduct){
    this.productItems.update($key,product);
  }

  deleteProduct($key:any){
    this.productItems.remove($key);
  }
}
