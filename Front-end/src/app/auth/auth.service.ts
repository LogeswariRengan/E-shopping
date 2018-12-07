import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn: boolean = false;
  adminUser: boolean = false;

  constructor(private route: Router) { }

  sendToken(token) {
    localStorage.setItem("LoggedInUserToken", token);
 
    if (localStorage.getItem("LoggedInUserToken")) {
      return true;
    }
    else {
      return false;
    }
  }

  decodeToken(){
    var token = this.fetchToken();
    var decodedValues = jwt_decode(token);
    if(decodedValues){
      return decodedValues;
    }
  
  }
  fetchToken() {
    var token = localStorage.getItem("LoggedInUserToken");
    return token;
  }
  getToken() {
    const token = localStorage.getItem("LoggedInUserToken");
    if (token === null) {
      return false;
    } else {
      return true;
    }
  }
  isLoggedIn() {
    const loggedToken = this.getToken();
    if (loggedToken) {
      this.userLoggedIn = true;
      return true;
    } else {
      this.userLoggedIn = false;
      return false;
    }
  }

  getRole() {
    const role = localStorage.getItem("LoggedInUserRole");
    if (role === null) {
      return null;

    } else {
      return role;
    }
  }




  logout() {

    localStorage.clear();
    this.route.navigate(['home']);
  }
}
