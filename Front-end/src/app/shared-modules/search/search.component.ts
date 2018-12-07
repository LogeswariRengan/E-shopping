import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/Models/ProductModel';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchProduct = new FormControl();
  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit() {

  }

  search() {

    if (this.searchProduct.value) {
  
      this.router.navigate(['/products-list', this.searchProduct.value]);
    }
  }




}
