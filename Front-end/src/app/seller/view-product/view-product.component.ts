import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/Models/ProductModel';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  imageUrl : any;
 public allProduct = []; 
  constructor(private service : ProductsService) { }

  ngOnInit() {
  // this.service.getAllProducts().subscribe(
  //   (response)=>{
  //  this.allProduct=response;
  //   }
  // )
  }


}
