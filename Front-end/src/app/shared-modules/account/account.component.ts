import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from '../../Models/UserModel';
import { AccountService } from 'src/app/services/account.service';
import { Constants } from 'src/app/Constants';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as jwt_decode from "jwt-decode";
import { passwordsMatch } from '../../login-module/passwordMatch';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  nameChangeForm: FormGroup;
  emailChangeForm: FormGroup;
  phoneChangeForm: FormGroup;
  passwordChangeForm: FormGroup;
  hide = true;
  newpasswordHide = true;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  user: any;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService, private activateRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.nameChangeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('[a-zA-Z]*')]]
    })
    this.emailChangeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-z.]+.{1}[a-z]{2,}')]]
    })
    this.phoneChangeForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('[9876]{1}[0-9]{9}')]]
    })
    this.passwordChangeForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
        validator: passwordsMatch('newPassword', 'confirmPassword')
      })

    // this.activateRoute.queryParams.subscribe(
    //   (params)=>{
    //     console.log("Params",params)
    //   }
    // )
    var token = this.authService.fetchToken();
    var decodedValues = jwt_decode(token);
    this.user = decodedValues;
  }


  updateName() {
    if (this.nameChangeForm.valid) {
      this.submitted = true;
    }
    if (this.submitted) {
      let model = new UserModel();
      model._userName = this.nameChangeForm.value['name'];
      model._id = this.user.userId;

      this.accountService.updateName(model).subscribe(
        (response) => {

          let isSet = this.authService.sendToken(response["updatedToken"]);
          if (isSet) {

            location.reload();
          }
          if (response["status"] === 600) {
            this.successMessage = Constants[600];
            swal(this.successMessage);

          }


        }, (error) => {

          this.errorMessage = error;
        }

      )

    }
  }


  updatePhone() {
    if (this.phoneChangeForm.valid) {
      this.submitted = true;
    }
    if (this.submitted) {
      let model = new UserModel();
      model._id = this.user.userId;
      model._phoneNumber = this.phoneChangeForm.value["phoneNumber"];
      this.accountService.updatePhoneNumber(model).subscribe(
        (response) => {
          console.log(response);
          let isSet = this.authService.sendToken(response['updatedToken'])
          if (isSet) {
            location.reload();
          }
          if (response["status"] === 602) {
            this.successMessage = Constants[602];
            swal(this.successMessage);
          }
        }, error => {
          alert(error);
          this.errorMessage = error;
        }
      )
    }
  }

  updateEmail() {
    if (this.emailChangeForm.valid) {
      this.submitted = true;
    }
    if (this.submitted) {
      let model = new UserModel();
      model._email = this.emailChangeForm.value['email']
      model._id = this.user.userId;

      this.accountService.updateEmail(model).subscribe(
        response => {

          let isSet = this.authService.sendToken(response['updatedToken']);
          if (isSet) {
            location.reload();
          }
          if (response["status"] === 601) {
            this.successMessage = Constants[601];
            swal(this.successMessage)
          }


        }, error => {
          alert(error);
          this.errorMessage = error;
        }
      );
    }
  }

  updatePassword() {
    if (this.passwordChangeForm.valid) {
      this.submitted = true;
    }
    if (this.submitted) {
      let model = new UserModel();
      model._id = this.user.userId;
      model._password = this.passwordChangeForm.value['oldPassword'];
      this.accountService.checkPassword(model).subscribe(
        (response) => {
          
          if (response) {
            model._password = this.passwordChangeForm.value['newPassword'];
            this.accountService.updatePassword(model).subscribe(
              (response) => {
               
                if (response["status"] === 603) {
                  this.successMessage = Constants[603];
                
                  swal(this.successMessage);
                 location.reload();
                }
              }
            )
          }
          else {
            this.errorMessage = Constants[604];
          }
        }
      )
    }
  }

}
