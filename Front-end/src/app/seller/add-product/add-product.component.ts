import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/Models/ProductModel';
import { ProductsService } from 'src/app/services/products.service';
import swal from 'sweetalert';
import { Constants } from 'src/app/Constants';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  newProductForm: FormGroup;
  submitted = false;

  selectedProduct = '';
  imageurl: any;
  fronturl: any;
  topUrl: any;
  backUrl: any;
  bottomUrl: any;
  leftUrl: any;
  rightUrl: any;

  productTypes = ['bag', 'watch', 'shoe'];
  productColors = ['Red', 'White', 'Black', 'Green', 'Blue', 'Yellow','Golden','brown'];
  productIdealFor = ['Men', 'Women', 'Girls', 'Boys', 'Kids'];

  bagBrands = ['sky bags', 'Puma', 'Wild craft', 'Metronaut', 'American Tourister'];
  bagMaterials = ['Polyester', 'Leather', 'Nylon', 'Canvas', 'Synthetic', 'Fabric'];
  bagThemes = ['ColorBlock', 'Laptop', 'Weekend', 'Travel', 'Hand-held'];

 
  watchMaterials = ['Gold', 'Ceramic', 'Fabric', 'Jewel', 'Metal', 'Leather'];
  watchFeatures = ['Alaram clock', 'Calendar', 'Altimeter', 'Barometer', 'Compass', 'Date display', 'Water assistant'];
  watchBrands = ['Titan', 'Fastrack', 'Casio', 'Timex', 'Sonata', 'Fossil'];
  watchTypes = ['Analog', 'Digital', 'Wrist'];

  shoeBrands = ['Sparx', 'Reebok', 'Nike', 'Puma', 'Bata', 'Adidas'];
  shoeMaterials = ['Canvas', 'Fabric', 'Felt', 'Leather', 'Polyester'];




  constructor(private formBuilder: FormBuilder, private productService: ProductsService) { }

  ngOnInit() {

    this.newProductForm = this.formBuilder.group({
      productPrice: ['', Validators.required],
      productOffer: [''],
      productOfferedPrice: [''],
      productRating: ['', [Validators.required,Validators.min(0),Validators.max(5)]],
      productDesc: ['', Validators.required],
      productColor: ['', Validators.required],
      productIdealFor: ['', Validators.required],
      bagBrand: ['', Validators.required],
      bagMaterial: ['', Validators.required],
      bagTheme: ['', Validators.required],
      bagCapacity: ['', Validators.required],
      watchBrand: ['', Validators.required],
      watchMaterial: ['', Validators.required],
      watchFeatures: ['', Validators.required],
      watchShape: ['', Validators.required],
      shoeBrand: ['', Validators.required],
      shoeMaterial: ['', Validators.required],
      watchType: ['', Validators.required],
      productImage: [null, Validators.required],
      frontViewImage: [null],
      topViewImage: [null],
      bottomViewImage: [null],
      backViewImage: [null],
      leftViewImage: [null],
      rightViewImage: [null],
    })
  }

  addNewProduct() {

    let productModel = new ProductModel();

    productModel._productType = this.selectedProduct;
    productModel._productPrice = this.newProductForm.value['productPrice'];
    productModel._productRating = this.newProductForm.value['productRating'];
    productModel._productDesc = this.newProductForm.value['productDesc'];
    productModel._productIdealFor =this.newProductForm.value['productIdealFor'];
    productModel._productColor = this.newProductForm.value['productColor'];
    productModel._productOffer = this.newProductForm.value['productOffer'];
    productModel._productOfferedPrice = this.newProductForm.value['productPrice']-(this.newProductForm.value['productPrice']*this.newProductForm.value["productOffer"])/100;
console.log("price",productModel._productOfferedPrice)
console.log("form price ", this.newProductForm.value['productOfferedPrice'])

    if (this.selectedProduct === 'bag') {

      productModel._bagBrand = this.newProductForm.value['bagBrand'];
      productModel._bagMaterial = this.newProductForm.value['bagMaterial'];
      productModel._bagTheme = this.newProductForm.value['bagTheme'];
      productModel._bagCapacity = this.newProductForm.value['bagCapacity'];
      productModel._productName = this.newProductForm.value['bagBrand'] + ' ' + this.newProductForm.value['bagCapacity'] + 'ltrs' + ' ' + this.newProductForm.value['bagTheme'] + " " + (this.newProductForm.value['productColor']);
    }
    else if (this.selectedProduct === 'watch') {
      productModel._watchBrand = this.newProductForm.value['watchBrand'];
      productModel._watchFeature = this.newProductForm.value['watchFeatures'];
      productModel._watchMaterial = this.newProductForm.value['watchMaterial'];
    
      productModel._watchType = this.newProductForm.value['watchType'];
      productModel._productName = this.newProductForm.value['watchBrand'] +" " +this.newProductForm.value['watchMaterial']+ " " + this.newProductForm.value['watchShape'] + " " + this.newProductForm.value['watchType'] + " " + (this.newProductForm.value['productColor']);
    }
    else {
      productModel._shoeBrand = this.newProductForm.value['shoeBrand'];
      productModel._shoeMaterial = this.newProductForm.value['shoeBrand'];
      productModel._productName = this.newProductForm.value['shoeBrand'] + " " + this.newProductForm.value['shoeBrand'] + " " + this.newProductForm.value['productColor'];

    }
    productModel._productImage = this.newProductForm.value['productImage'];
    productModel._topView = this.newProductForm.value['frontViewImage'];
    productModel._frontView = this.newProductForm.value['frontViewImage'];
    productModel._bottomView = this.newProductForm.value['bottomViewImage'];
    productModel._leftView = this.newProductForm.value['leftViewImage'];
    productModel._rightView = this.newProductForm.value['rightViewImage'];
    productModel._backView = this.newProductForm.value['backViewImage'];




    // if (this.newProductForm.valid) {
    //   this.submitted = true;
    // }

    // if (this.submitted) {

    console.log("Product model !!!!", productModel._productName);
    this.productService.addNewProduct(productModel).subscribe(
      (response) => {
        console.log("RETURN RESPONSE!!!!!!", response);
        if (response === 505) {
          let message = Constants[505];
          swal(message);
      // window.location.reload();
        }
      },
      error => alert(error));


  }

  onSelectProductImage(event) {
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.imageurl = reader.result;

        this.newProductForm.patchValue({
          productImage: this.imageurl

        })
        console.log(typeof this.newProductForm.value['productImage'])
      }

    }

  }

  onSelectFrontImage(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.fronturl = reader.result;
        this.newProductForm.patchValue({
          frontViewImage: this.fronturl

        })

      }
      console.log(this.newProductForm)
    }
  }

  onSelectTopImage(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.topUrl = reader.result;
        this.newProductForm.patchValue({
          topViewImage: this.topUrl

        })

      }
      console.log(this.newProductForm)
    }
  }

  onSelectBacktImage(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.backUrl = reader.result;
        this.newProductForm.patchValue({
          backViewImage: this.backUrl

        })

      }
      console.log(this.newProductForm)
    }
  }


  onSelectBottomImage(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.bottomUrl = reader.result;
        this.newProductForm.patchValue({
          bottomViewImage: this.bottomUrl

        })

      }
      console.log(this.newProductForm)
    }

  }

  onSelectLeftImage(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.leftUrl = reader.result;
        this.newProductForm.patchValue({
          leftViewImage: this.leftUrl

        })

      }
      console.log(this.newProductForm)
    }

  }

  onSelectRightImage(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.rightUrl = reader.result;
        this.newProductForm.patchValue({
          rightViewImage: this.rightUrl

        })

      }
      console.log(this.newProductForm)
    }
  }
  onChange(value) {

    this.selectedProduct = value;
  }


  reset() {
   
      this.newProductForm.reset();
    
  }

}
