import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import { DataServiceService } from '../../auth/data-service.service';
import { RegisterComponent } from '../../login-module/register/register.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component'
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert';
import { UserModel } from '../../Models/UserModel';
import { Constants } from 'src/app/Constants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accountForm: FormGroup;
  submitted = false;
  enteredEmail: String;
  hide = true;


  role: String;
  errorMessage: String;


  constructor(private formBuilder: FormBuilder, private router: Router, private service: DataServiceService, private authService: AuthService, private dialog: MatDialog, private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-z.]+.{1}[a-z]{2,}')]],
      passWord: ['', [Validators.required]]
    });
  }

  login() {

    let model = new UserModel();
    model._email = this.accountForm.value['email'];
    model._password = this.accountForm.value['passWord'];
    if (this.accountForm.valid) {
      this.submitted = true;
    }
    if (this.submitted) {
      this.service.loginAccount(model).subscribe(
        response => {


          if (response["status"] === 303) {
            let message = Constants[303];

            var isSet = this.authService.sendToken(response["token"]);
            if (isSet) {
              swal(message);
            }


            this.dialogRef.close();



          } else if (response === 304) {
            this.errorMessage = Constants[304];
          } else if (response === 305) {
            this.errorMessage = Constants[305];
          }

          //  if(role === "seller"){
          //    this.router.navigate(["/sellerHome"]);
          //  }

          // this.role = response[0]['role'];


        },
        error => alert(error));
    }



  }
  close() {
    this.dialogRef.close();
  }


  openDialogRegister() {
    const dialogConif = new MatDialogConfig();
    dialogConif.height = "650px";
    dialogConif.width = "620px";
    dialogConif.disableClose = false;
    const dialogRef = this.dialog.open(RegisterComponent, dialogConif);
    dialogRef.afterClosed().subscribe(
      data => console.log("Registered output:", data)
    );
  }

  openDialogForgotPassword() {
    const dialogConif = new MatDialogConfig();
    dialogConif.height = "350px";
    dialogConif.width = "550px";
    dialogConif.disableClose = false;
    const dialogRef = this.dialog.open(ResetPasswordComponent, dialogConif);
    dialogRef.afterClosed().subscribe(
      data => console.log("Forgot Password output:", data)
    );
  }

}
