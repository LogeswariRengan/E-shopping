import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../Models/UserModel';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  nodeServiceUrl = "http://172.16.144.167:3000/baserouting/";
  constructor(private http: HttpClient) { }



  updateName(model: UserModel) {

    return this.http.put(this.nodeServiceUrl + "users/updateName", model);
  }

  updateEmail(model: UserModel) {

    return this.http.put(this.nodeServiceUrl + "users/updateEmail", model);
  }


  updatePhoneNumber(model: UserModel) {
    return this.http.put(this.nodeServiceUrl + "users/updatePhone", model);
  }

  checkPassword(model: UserModel) {
    return this.http.post(this.nodeServiceUrl + "users/checkPassword", model);
  }

  updatePassword(model: UserModel) {
console.log(model)
    return this.http.put(this.nodeServiceUrl + "users/updatePassword", model);
  }

}
