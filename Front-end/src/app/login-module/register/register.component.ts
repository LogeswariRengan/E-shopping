import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataServiceService } from '../../auth/data-service.service';
import { UserModel } from '../../Models/UserModel';
import swal from 'sweetalert';
import { Constants } from '../../Constants';
import {passwordsMatch} from '../passwordMatch';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage : String;
  hide = true;
  
  constructor(private dialog: MatDialog, private service: DataServiceService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('[a-zA-Z]*')]],
      passWord: ['', [Validators.required]],
      confirmPassword :['',Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.]+@[a-z.]+.{1}[a-z]{2,}')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[9876]{1}[0-9]{9}')]],
      secretQuestion: ['', [Validators.required]],
      secretAnswer: ['', [Validators.required]],
      recaptcha: [null, Validators.required]
    },{
      validator : passwordsMatch('passWord','confirmPassword')
    }
    );
  }


  close() {
    this.dialogRef.close();
  }

  register() {
    let model = new UserModel();
    model._userName = this.registerForm.value['userName'];
    model._password = this.registerForm.value['passWord'];
    model._email = this.registerForm.value['email'];
    model._phoneNumber = this.registerForm.value['phoneNumber'];
    model._secretQuestion = this.registerForm.value['secretQuestion'];
    model._secretAnswer = this.registerForm.value['secretAnswer'];

    this.service.registerAccount(model).subscribe(
      (response) => {
       console.log(response)
        if (response === 301) {
          let message = Constants[301];
          swal(message);
          this.dialogRef.close(this.registerForm.value);
        }else if (response === 302){
          this.errorMessage  = Constants[302];
        }
      },
      error => alert(error.message + 'Please check it')
    );

  }


  reset() {
    if (this.registerForm.valid) {
      this.registerForm.reset();
    }
  }

}
