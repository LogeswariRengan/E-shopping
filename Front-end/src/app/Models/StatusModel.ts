export class StatusModel {
    private userId: String;
    private productId: String;
    private status: String;
    private productQuantity: Number;

    //productQuantity 
    set _productQuantity(productQuantity: Number) {
        this.productQuantity = productQuantity;
    }
    get _productQuantity(): Number {
        return this.productQuantity;
    }
    //User id 
    set _userId(userId: String) {
        this.userId = userId;
    }
    get _userId(): String {
        return this.userId;
    }

    //product id
    set _productId(productId: String) {
        this.productId = productId;
    }
    get _productId(): String {
        return this.productId;
    }


    //status
    set _status(status: String) {
        this.status = status;
    }

    get _status(): String {
        return this.status;
    }


}