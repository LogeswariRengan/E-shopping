import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from '../Models/UserModel';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
    nodeServiceUrl ="http://172.16.144.167:3000/baserouting/";
  constructor(private http: HttpClient) { }

  registerAccount(model : UserModel) {
  
    return this.http.post( this.nodeServiceUrl+"users/register", model);
  }


  loginAccount(login_model: UserModel)  {
   
    return this.http.post(this.nodeServiceUrl+"users/login",login_model);
  }

  getSecretQuesAns(model : UserModel){
    console.log(model);
   
    return this.http.post(this.nodeServiceUrl+"users/forgotPassword",model);
  }

  resetPassword(password_model : UserModel){
   
   return this.http.put(this.nodeServiceUrl+"users/resetPassword",password_model);
  }
}

