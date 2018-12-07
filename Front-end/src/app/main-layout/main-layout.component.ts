import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login-module/login/login.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  title = "E-shopping";
  userName: String;

  constructor(  private router: Router, private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.getValues()
  }

  openDialogLogin() {
    const dialogConif = new MatDialogConfig();
    dialogConif.height = "400px";
    dialogConif.width = "450px";
    dialogConif.disableClose = true;
    const dialogRef = this.dialog.open(LoginComponent, dialogConif);
    dialogRef.afterClosed().subscribe();

  }
  getValues() {
  
    var token = this.authService.fetchToken();
    var decodeValue = jwt_decode(token);
    console.log("decode valuse", decodeValue)
    this.userName = decodeValue["userName"];
  }


  gotoUrl() {
    this.router.navigate(['/account']);
  }
  
  logout() {
    if (confirm("Are you sure want to logout")) {
      this.authService.logout();
    }
  }
}
