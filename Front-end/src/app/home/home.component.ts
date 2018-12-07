import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  bag = "bag";
  public allProducts = [];
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    // this.productService.getAllProducts().subscribe(
    //   (response) => {
    //     this.allProducts = response;
    //   },
    //   error => alert("Error ... Please check it" + error)
    // );
  }



}
