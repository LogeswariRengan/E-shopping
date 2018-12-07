import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/Models/ProductModel';
// import { NgProgress } from 'ngx-progressbar';

import { OrderPipe } from 'ngx-order-pipe';
import { productFilterPipe } from 'src/app/Custom-pipes/product-filters';




@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  reverse = false;
  min = 10;
  max = 5000;
  step = 100;
  value: Number;
  sortbyPrice: String;
  colorr: String;
  redColor;
  greenColor;
  blueColor;
  yellowColor;
  sortedPrice: String = 'productOfferedPrice';
  public allProducts = [];
  public filterdProducts = [];
  public sortedProducts = [];
  productType: String;
  colorSet = new Set();
  idealForSet = new Set();

  bagBrandSet = new Set();
  bagThemeSet = new Set();
  bagMaterialSet = new Set();
  bagCapacitySet = new Set();

  watchBrandSet = new Set();
  watchTypeSet = new Set();
  watchMaterialSet = new Set();
  watchFeatureSet = new Set();


  colorFilter: String;
  brandFilter: String;

  colorFilters = new Set<String>();





  constructor(private productFilter: productFilterPipe,
    private orderPipe: OrderPipe, private router: Router, private activateRoute: ActivatedRoute, private productService: ProductsService) {

    this.sortedProducts = orderPipe.transform(this.allProducts, 'productOfferedPrice');

  }



  ngOnInit() {
    // this.ngProgress.start();
    this.activateRoute.paramMap.subscribe(params => {
      console.log("TYPE!!!!!!!!!!!!!", params.get('product-type'))
      this.productType = params.get('product-type');
      this.getSearchedProduct(this.productType);
      // this.ngProgress.done();

    })



  }

  // getColors()  : any{
  // let model=new ProductModel();
  // this.productService.getProducts(model).subscribe(
  //   (response)=>{
  //     return response;
  //   }
  // )
  // }

  selectPriceToSort(event) {

    console.log("EVENT VALUE!!!!!!", event.value)

    if (event.value == "lth") {
      this.reverse = false;

    }
    else if (event.value = "htl") {
      this.reverse = true;
    }

  }

  getSearchedProduct(product: String) {
    let productModel = new ProductModel();
    productModel._productType = product;
    this.productService.getProducts(productModel).subscribe(
      (response) => {
        console.log("RETURNRED PRODUCT", response)
        this.allProducts = response;
        var products = this.allProducts;
        for (let product of products) {
          let colors = product.productColor.split(',');
          for (let color of colors) {
            this.colorSet.add(color);
          }

          // let ideals = product.productIdealFor.split(',');
          // for (let ideal of ideals) {
          //   this.idealForSet.add(ideal);
          // }


          if (product.productType === 'bag') {
            this.bagBrandSet.add(product.bagBrand);
            this.bagThemeSet.add(product.bagTheme);
            this.bagMaterialSet.add(product.bagMaterial);
            this.bagCapacitySet.add(product.bagCapacity);
          }

          if (product.productType === 'watch') {
            this.watchBrandSet.add(product.watchBrand);
            let features = product.watchFeature.split(',');
            for (let feature of features) {
              this.watchFeatureSet.add(feature);
            }
            this.watchMaterialSet.add(product.watchMaterial);
            let types = product.watchType.split(',');
            for (let type of types) {
              this.watchTypeSet.add(type);
            }
          }


        }

      }, error => alert("ERROR " + error.message)
    )
  }


  showProduct(product){
  
  this.router.navigate(['/prodDesc',product._id]);
  }

  searchColors(colorValue, event) {


    if (event.checked) {

      this.colorFilters.add(colorValue);
      console.log("color set values ",this.colorFilters)
      // this.colorFilter = colorValue

      // this.allProducts = this.productFilter.transform(this.allProducts, this.colorFilters);
      // console.log("returned filtered products", this.allProducts)

    }
    else {
      this.colorFilters.delete(colorValue);
      this.colorFilter = null;
      // this.allProducts = this.productFilter.transform(this.allProducts, this.colorFilters);
      // console.log("returned filtered productsssssssssssss", this.allProducts)
    }
    // console.log(this.array);
    // console.log("set values", this.colorFilters);
    // console.log("typeeeeee",typeof this.colorFilters)
    //   this.colorFilters.forEach(function(item){
    //   console.log(item)
    // });
  }



  searchBagBrand(brandValue) {
    this.brandFilter = brandValue;
  }

  pitch(event: any) {
    console.log("PRICE >>>>", event.value);

  }


  // color(event) {
  //   console.log(event)
  //   console.log(event.source.value);

  // }

}
