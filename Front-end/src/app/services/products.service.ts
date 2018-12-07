import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../Models/ProductModel';
import { Observable } from 'rxjs';
import { StatusModel } from '../Models/StatusModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  product: ProductModel;

  nodeServiceUrl = "http://172.16.144.167:3000/baserouting/";
  constructor(private http: HttpClient) { }

  getProducts(product: ProductModel): Observable<ProductModel[]> {

    return this.http.post<ProductModel[]>(this.nodeServiceUrl + "products/fetchSearchedProduct", product);
  }


  // getAllProducts(): Observable<ProductModel[]> {
  //   return this.http.get<ProductModel[]>(this.nodeServiceUrl + "products/fetchproduct");
  // }

  addNewProduct(newProduct: ProductModel) {
    console.log("PRODUCT MODELS!!!!!!!!!!!!!!!", newProduct);
    return this.http.post(this.nodeServiceUrl + "products/addproduct", newProduct);
  }




  getProductDetails(product: ProductModel) {

    return this.http.post<ProductModel>(this.nodeServiceUrl + "products/getProduct", product);

  }

  addProductToCart(status: StatusModel) {

    return this.http.post(this.nodeServiceUrl + 'status/addProductToCart', status);
  }


  getCartProducts(statusModel: StatusModel) {

    return this.http.post(this.nodeServiceUrl + "status/fetchCartProducts", statusModel);
  }

  setProdctQuantity(statusModel: StatusModel) {
    console.log("service model ", statusModel)
    return this.http.post(this.nodeServiceUrl + "status/updateProductQuantity", statusModel);
  }

}
