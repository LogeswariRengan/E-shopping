import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import * as jwt_decode from "jwt-decode";
import { AuthService } from 'src/app/auth/auth.service';
import { StatusModel } from 'src/app/Models/StatusModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any;
  decodeValue: any;
  cartProducts = [];
  totalPrice = 0;
  totalItems = 0;
  chooseQuantity = ['1', '2', '3', '4', '5', '6', '7', "8", "9", "10"];
  quantityError: String;
  productTotalPrice;

  constructor(private productService: ProductsService, private authService: AuthService) { }

  ngOnInit() {
    console.log("cart")
    this.decodeValue = this.authService.decodeToken();
    let statusModel = new StatusModel();
    statusModel._userId = this.decodeValue.userId;
    statusModel._status = "Cart";
    this.productService.getCartProducts(statusModel).subscribe(
      (response) => {
        console.log("response", response)
        this.products = response;
        for (let res of this.products) {
          this.cartProducts.push(res[0])
        }
        this.calculatePrice();
      }, (error) => {
        alert(error)
      })



    console.log("price", this.totalPrice)
  }


  calculatePrice() {
    for (let product of this.cartProducts) {
      console.log("product price", product.productOfferedPrice)


      this.totalItems = this.totalItems + product.quantity;
      this.totalPrice = this.totalPrice + (product.quantity * product.productOfferedPrice);
    }
    console.log("price", this.totalPrice)
  }

  setMaxQuantity(event, product) {
    let quantity = event.value;
    console.log("selected value", quantity)
    console.log("user ", product.productPerUser)
    if (quantity > product.productPerUser) {
      this.quantityError = "This product seller has a limit of " + product.productPerUser + " per customer. ";
    } else {
      this.quantityError = "";

      product.quantity = parseInt(quantity);

      var statusModel = new StatusModel();
      statusModel._productQuantity = product.quantity;
      statusModel._productId = product._id
      statusModel._userId = this.decodeValue.userId;
      console.log("model", statusModel);
      this.productService.setProdctQuantity(statusModel).subscribe(
        (response) => {
          console.log("response", response)
          location.reload();
        }, (error) => {
          alert(error)
        }
      )
      // this.productTotalPrice = quantity * product.productOfferedPrice;

      // this.totalPrice = this.totalPrice + this.productTotalPrice;

      // this.totalItems = this.totalItems + parseInt(quantity);


    }
  }
}
