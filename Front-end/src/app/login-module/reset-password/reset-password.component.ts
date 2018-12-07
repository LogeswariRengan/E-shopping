import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MatStepper } from "@angular/material";
import { DataServiceService } from '../../auth/data-service.service';
import { UserModel } from '../../Models/UserModel';
import { Constants } from 'src/app/Constants';
import {passwordsMatch} from '../passwordMatch';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  emailForm: FormGroup;
  answerForm: FormGroup;
  hide=true;
  
  answer: any;
  resetPasswordForm: FormGroup;
  wrongAnswer: String;
  successMessage: String;
  errorMessage : String;


  constructor(private _formBuilder: FormBuilder, private service: DataServiceService, private dialog: MatDialog, private dialogRef: MatDialogRef<ResetPasswordComponent>) {

  }

  ngOnInit() {
    this.emailForm = this._formBuilder.group({
      email: ['', [Validators.required,Validators.pattern('[a-zA-Z0-9.]+@[a-z.]+.{1}[a-z]{2,}')]]
    });
    this.answerForm = this._formBuilder.group({
      secretQuestion: ['', Validators.required],
      secretAnswer: ['', Validators.required]
    });
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator:passwordsMatch('newPassword','confirmPassword')
    })
  }

  verifyEmail(stepper: MatStepper) {

    let emailModel = new UserModel();
    emailModel._email = this.emailForm.value['email'];
    this.service.getSecretQuesAns(emailModel).subscribe(
      (response) => {

        console.log("RESPONSE >>>>>>>>>>>>>>>>>>>>>", response);
        if(response === 305){
         this.errorMessage = Constants[305];
         stepper.reset();
        }
        else{
          var question = response["secretQuestion"];
          this.answer = response["secretAnswer"];
          this.answerForm.controls["secretQuestion"].setValue(question);
          stepper.next();
        }
        
      },
      error => {
        alert(error.message + 'Please check it');
        stepper.reset();

      }
    );
  }

  verifyAnswer(stepper: MatStepper) {
    console.log('Verification ...........');
    if (this.answerForm.controls["secretAnswer"].value === this.answer) {
      stepper.next();
    }
    else {
      this.wrongAnswer = Constants[308];
      stepper.previous();
    }
  }




 resetPassword(stepper: MatStepper) {

    let newPassword = this.resetPasswordForm.value['newPassword'];

    let confirmPassword = this.resetPasswordForm.value['confirmPassword'];

    if (newPassword === confirmPassword) {
      console.log("Verified crt!!!!!!!!!!!!!!!!!!!!!");

      let passwordModel = new UserModel();
      passwordModel._password = newPassword;
      passwordModel._email =this.emailForm.value['email'];
      this.service.resetPassword(passwordModel).subscribe(
        (response) => {
          console.log("RESETING RESPONSE!!!!!!!!!!!!!!", response);
          if (response === 306) {
            this.successMessage = Constants[306];
            stepper.next();
          }
        },
        error => {
          alert(error.message);
          stepper.reset();
        }
      );
    }
   

  }


  close() {
    this.dialogRef.close();
  }


}
