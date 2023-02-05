import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { SigninComponent } from './components/signin/signin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { HomeComponent } from './components/home/home.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SignupComponent } from './components/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import player from 'lottie-web';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';
import { SwiperModule } from 'swiper/angular';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    ErrorMessageComponent,
    UpdateProfileComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailComponent,
    AddProductModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    BrowserAnimationsModule,
    SwiperModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    NgImageSliderModule,
    CarouselModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      easing: '300',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
