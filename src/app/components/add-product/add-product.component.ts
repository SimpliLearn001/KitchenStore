import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm!: FormGroup;
  constructor(private productService:ProductService, private router:Router) { }

  get title(){
    return this.addProductForm.get("title");
  }
  get price(){
    return this.addProductForm.get("price");
  }
  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      title:new FormControl('',Validators.required),
      description:new FormControl(''),
      type:new FormControl(''),
      rating:new FormControl(''),
      price:new FormControl('',Validators.required)
    });
  }

  addProduct(){

    let product:any={
      id: 0,
      title: '',
      type: '',
      description: '',
      price: 0,
      rating: 0
    }
    product.id = new Date().valueOf();
    product.title = this.addProductForm.get("title")?.value;
    product.description = this.addProductForm.get("description")?.value;
    product.type = this.addProductForm.get("type")?.value;
    product.rating =  this.addProductForm.get("rating")?.value;
    product.price = this.addProductForm.get("price")?.value;
    if(product.title == '' || product.price == ''){
      Swal.fire('Sorry!', 'Product not added', 'error');
      this.router.navigate(["manage-products"]);
    }else{
      this.productService.addProduct(product);
      Swal.fire('Hurray!', 'Product Added Successfully', 'success');
      this.router.navigate(["manage-products"]);
    }
  }
}
