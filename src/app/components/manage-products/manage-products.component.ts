import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  products:IProduct[]=[];
  constructor(private productService:ProductService,
    private adminService:AdminService,
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

  updateProduct(id:any){
    document.getElementById('Card'+id)?.removeAttribute("hidden");
    document.getElementById('Form'+id)?.setAttribute("hidden","true");
    document.getElementById('CancelEdit'+id)?.setAttribute("hidden","true");
    document.getElementById('Edit'+id)?.removeAttribute("hidden");

    let tempProduct:any={
      id: 0,
      title: '',
      type: '',
      description: '',
      price: 0,
      rating: 0
    };
    tempProduct.id = id;
    let tempTitle = document.getElementById('title'+id) as HTMLInputElement;
    tempProduct.title = tempTitle.value;
    let tempDescription = document.getElementById('description'+id)as HTMLInputElement;
    tempProduct.description = tempDescription.value;
    let tempType = document.getElementById('type'+id)as HTMLInputElement;
    tempProduct.type = tempType.value;
    let tempRating = document.getElementById('rating'+id) as HTMLInputElement;
    tempProduct.rating = parseFloat(tempRating.value);
    let tempPrice = document.getElementById('price'+id)as HTMLInputElement;
    tempProduct.price = parseFloat(tempPrice.value);
    this.productService.getProducts().query.once('value',snap => {
      snap.forEach( prod => {
        if(prod.child('id').val() == id)
          this.productService.updateProduct(prod.key,tempProduct);
      })
    });
  }

  removeProduct(id:any){
    this.productService.getProducts().query.once('value',snap => {
      snap.forEach( product => {
        if(product.child('id').val() == id)
          this.productService.deleteProduct(product.key);
      })
    });
  }

  editProduct(product:any){
    document.getElementById('Card'+product.id)?.setAttribute("hidden","true");
    document.getElementById('Form'+product.id)?.removeAttribute("hidden");
    document.getElementById('CancelEdit'+product.id)?.removeAttribute("hidden");
    document.getElementById('Edit'+product.id)?.setAttribute("hidden","true");

    let title = document.getElementById('title'+product.id) as HTMLInputElement;
    title.value = product.title;
    let description = document.getElementById('description'+product.id) as HTMLInputElement;
    description.value = product.description;
    let type = document.getElementById('type'+product.id) as HTMLInputElement;
    type.value = product.type;
    let rating = document.getElementById('rating'+product.id) as HTMLInputElement;
    rating.value = product.rating;
    let price = document.getElementById('price'+product.id) as HTMLInputElement;
    price.value = product.price;
  }

  cancelEditProduct(id:any){
    document.getElementById('Card'+id)?.removeAttribute("hidden");
    document.getElementById('Form'+id)?.setAttribute("hidden","true");
    document.getElementById('CancelEdit'+id)?.setAttribute("hidden","true");
    document.getElementById('Edit'+id)?.removeAttribute("hidden");
  }

  logout(){
    this.adminService.adminLogout();
    this.router.navigate(["home/adminlogin"]);
  }
}
