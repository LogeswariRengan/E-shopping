export class ProductModel {
    private productId: Number;
    private productName: String;
    private productType: String;
    private productPrice: Number;
    private productOffer: Number;
    private productOfferedPrice: Number;
    private productRating: Number;
    private productDesc: String;
    private productColor: String;
    private productAvailabilty: Number;
    private productIdealFor: String;
    private bagBrand: String;
    private bagMaterial: String;
    private bagTheme: String;
    private bagCapacity: Number;
    private watchBrand: String;
    private watchMaterial: String;
    private watchFeature: String;

    private shoeBrand: String;
    private shoeMaterial: String;
    private watchType: String;
    private productImage: String;
    private frontView: String;
    private topView: String;
    private backView: String;
    private bottomView: String;
    private leftView: String;
    private rightView: String;




    //productAvailabilty
    set _productAvailabilty(productAvailabilty: Number) {
        this._productAvailabilty = productAvailabilty;
    }
    get _productAvailabilty(): Number {
        return this.productAvailabilty;
    }


    //productOfferedPrice
    set _productOfferedPrice(productOfferedPrice: Number) {
        this.productOfferedPrice = productOfferedPrice;
    }
    get _productOfferedPrice(): Number {
        return this.productOfferedPrice;
    }

    //productOffer
    set _productOffer(productOffer: Number) {
        this.productOffer = productOffer;
    }
    get _productOffer(): Number {
        return this.productOffer;
    }

    //rightView
    set _rightView(rightView: String) {
        this.rightView = rightView;
    }
    get _rightView(): String {
        return this.rightView;
    }

    //leftView
    set _leftView(leftView: String) {
        this.leftView = leftView;
    }
    get _leftView(): String {
        return this.leftView;
    }

    //bottomView
    set _bottomView(bottomView: String) {
        this.bottomView = bottomView;
    }
    get _bottomView(): String {
        return this.bottomView;
    }


    //backView
    set _backView(backView: String) {
        this.backView = backView;
    }
    get _backView(): String {
        return this.backView;
    }


    //topView
    set _topView(topView: String) {
        this.topView = topView;
    }
    get _topView(): String {
        return this.topView;
    }


    //frontView
    set _frontView(frontView: String) {
        this.frontView = frontView;
    }
    get _frontView(): String {
        return this.frontView;
    }


    //productImage
    set _productImage(productImage: String) {
        this.productImage = productImage;
    }
    get _productImage(): String {
        return this.productImage;
    }


    //shoeType
    set _watchType(watchType: String) {
        this.watchType = watchType;
    }
    get _watchType(): String {
        return this.watchType;
    }


    //shoeMaterial
    set _shoeMaterial(shoeMaterial: String) {
        this.shoeMaterial = shoeMaterial;
    }
    get _shoeMaterial(): String {
        return this.shoeMaterial;
    }


    //shoeBrand
    set _shoeBrand(shoeBrand: String) {
        this.shoeBrand = shoeBrand;
    }
    get _shoeBrand(): String {
        return this.shoeBrand;
    }



    //watchFeature
    set _watchFeature(watchFeature: String) {
        this.watchFeature = watchFeature;
    }
    get _watchFeature(): String {
        return this.watchFeature;
    }

    //watchMaterial
    set _watchMaterial(watchMaterial: String) {
        this.watchMaterial = watchMaterial;
    }
    get _watchMaterial(): String {
        return this.watchMaterial;
    }

    //watchBrand
    set _watchBrand(watchBrand: String) {
        this.watchBrand = watchBrand;
    }
    get _watchBrand(): String {
        return this.watchBrand;
    }


    //bagCapacity
    set _bagCapacity(bagCapacity: Number) {
        this.bagCapacity = bagCapacity;
    }
    get _bagCapacity(): Number {
        return this.bagCapacity;
    }


    //bagTheme
    set _bagTheme(bagTheme: String) {
        this.bagTheme = bagTheme;
    }
    get _bagTheme(): String {
        return this.bagTheme;
    }

    //bagMaterial
    set _bagMaterial(bagMaterial: String) {
        this.bagMaterial = bagMaterial;
    }
    get _bagMaterial(): String {
        return this.bagMaterial;
    }


    //bagBrand
    set _bagBrand(bagBrand: String) {
        this.bagBrand = bagBrand;
    }
    get _bagBrand(): String {
        return this.bagBrand;
    }


    //productIdealFor
    set _productIdealFor(productIdealFor: String) {
        this.productIdealFor = productIdealFor;
    }
    get _productIdealFor(): String {
        return this.productIdealFor;
    }

    //productId
    set _productId(productId: Number) {
        this.productId = productId;
    }

    get _productId(): Number {
        return this.productId;
    }


    //productName
    set _productName(productName: String) {
        this.productName = productName;
    }

    get _productName(): String {
        return this.productName;
    }

    //productType
    set _productType(productType: String) {
        this.productType = productType;
    }

    get _productType(): String {
        return this.productType;
    }

    //productPrice 
    set _productPrice(productPrice: Number) {
        this.productPrice = productPrice;
    }
    get _productPrice(): Number {
        return this.productPrice;
    }


    //productRating
    set _productRating(productRating: Number) {
        this.productRating = productRating;
    }
    get _productRating(): Number {
        return this.productRating;
    }



    //productDesc
    set _productDesc(productDesc: String) {
        this.productDesc = productDesc;
    }
    get _productDesc(): String {
        return this.productDesc;
    }

    //productColor
    set _productColor(productColor: String) {
        this.productColor = productColor;
    }
    get _productColor(): String {
        return this.productColor;
    }


}