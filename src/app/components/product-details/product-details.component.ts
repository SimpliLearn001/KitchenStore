import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireList } from 'angularfire2/database';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product?:IProduct;
  products:IProduct[];
  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute) { 
    this.products = <IProduct[]><unknown>this.productService.getProducts();
  }

  ngOnInit(): void {
  }

}
