import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginComponent } from '../login-module/login/login.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {
  userName: String;

  title = "E-shopping";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private dialog: MatDialog, private authService: AuthService) {

  }
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
