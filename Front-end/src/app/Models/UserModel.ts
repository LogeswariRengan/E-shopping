export class UserModel {
    private email: String;
    private id : String;
    private password: String;
    private userName: String;
    private phoneNumber: Number;
    private secretQuestion: String;
    private secretAnswer: String;


    //id model
    set _id(id :String){
        this.id=id;
    }
    get _id():String{
        return this.id;
    }
    // Email model 
    set _email(email: String) {
        this.email = email;
    }

    get _email(): String {
        return this.email;
    }
    //Password model
    set _password(password: String) {
        this.password = password;
    }
    get _password(): String {
        return this.password;
    }

    //Username model
    set _userName(userName: String) {
        this.userName = userName;
    }
    get _userName(): String {
        return this.userName;
    }

    //PhoneNumber model
    set _phoneNumber(phoneNumber: Number) {
        this.phoneNumber = phoneNumber;
    }
    get _phoneNumber(): Number {
        return this.phoneNumber;
    }

    //SecretQuestion model
    set _secretQuestion(secretQuestion: String) {
        this.secretQuestion = secretQuestion;
    }
    get _secretQuestion(): String {
        return this.secretQuestion;
    }

    //SecretAnswer model
    set _secretAnswer(secretAnswer: String) {
        this.secretAnswer = secretAnswer;
    }
    get _secretAnswer(): String {
        return this.secretAnswer;
    }
}