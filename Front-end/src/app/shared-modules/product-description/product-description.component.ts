import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/Models/ProductModel';
import { AuthService } from '../../auth/auth.service'
import * as jwt_decode from "jwt-decode";
import { StatusModel } from 'src/app/Models/StatusModel';





@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  showProduct: any;
  imageSrc = "";
  decodeValue: any;


  constructor(private authService: AuthService, private productService: ProductsService, private activateRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {


    this.activateRoute.paramMap.subscribe(params => {


      this.getProductDetails(params.get("product-id"));

    })


  }


  getProductDetails(productId) {
    let productModel = new ProductModel();
    productModel._productId = productId;
    this.productService.getProductDetails(productModel).subscribe(
      (response) => {
        this.showProduct = response;
        console.log("showw", this.showProduct)
        this.imageSrc = this.showProduct['productImage'];

      });
  }



  imageView() {
    this.imageSrc = event.target['src'];


  }

  addToCart() {

    this.decodeValue = this.authService.decodeToken();

    var statusModel = new StatusModel();
    statusModel._userId = this.decodeValue.userId;
    statusModel._productId = this.showProduct._id;
    statusModel._status = "Cart";

    this.productService.addProductToCart(statusModel).subscribe(
      (response) => {
        console.log("Response", response);
        if (response === 605) {
          this.router.navigate(['/cart']);
        }
        else {

        }
      }, (error) => {
        alert(error)
      }
    )



  }

  gotoUrl() {
    console.log("Buy now")
  }
}
