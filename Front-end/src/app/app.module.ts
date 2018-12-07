import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatMenuModule } from '@angular/material/menu';
import { SliderComponent } from './slider/slider.component';
import { AppComponent } from './app.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatExpansionModule,
  MatCheckboxModule, MatIconModule, MatSelectModule, MatListModule, MatSliderModule,MatTabsModule
} from '@angular/material';
import { LoginComponent } from './login-module/login/login.component';
import { RegisterComponent } from './login-module/register/register.component';

import { ResetPasswordComponent } from './login-module/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app.routing.module';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatCardModule } from '@angular/material/card';
import {NgxPaginationModule} from 'ngx-pagination';


import { ImageZoomModule } from 'angular2-image-zoom';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { productFilterPipe } from '../app/Custom-pipes/product-filters';
import { OrderModule } from 'ngx-order-pipe';



import { SearchComponent } from '../app/shared-modules/search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {ZoomImageComponent} from '../app/shared-modules/zoom-image/zoom-image.component'




@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    SliderComponent,
    LoginComponent,
    RegisterComponent,
    routingComponents,
    ZoomImageComponent,

    ResetPasswordComponent,
    SearchComponent,
    PageNotFoundComponent,

    productFilterPipe,

    MainLayoutComponent

  ],
  imports: [
    BrowserModule,
    LayoutModule,
    AngularWebStorageModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgMatSearchBarModule,
    MatMenuModule,
    NgxPaginationModule,

    MatDialogModule,
    MatStepperModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    ImageZoomModule,
    NgxImageZoomModule.forRoot(),
    MatCardModule,
    MatSliderModule,
    MatSelectModule,
    MatExpansionModule,
    MatTabsModule,
    MatCheckboxModule, OrderModule


  ],
  providers: [productFilterPipe, {
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    } as RecaptchaSettings,
  }],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, RegisterComponent, ResetPasswordComponent],
  exports: [LoginComponent]
})
export class AppModule { }
