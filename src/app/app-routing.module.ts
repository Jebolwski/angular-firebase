import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {HomeComponent} from './components/home/home.component';
import {LoggedinService as LoggedIn} from './services/loggedin.service';
import {NotloggedinService as NotLoggedIn} from './services/notloggedin.service';
import {ProductsComponent} from './components/products/products.component';
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {CartComponent} from "./components/cart/cart.component";

const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home • Shopify'},
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Signin • Shopify',
    canActivate: [NotLoggedIn],
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup • Shopify',
    canActivate: [NotLoggedIn],
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products • Shopify',
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    title: 'Product • Shopify',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart • Shopify',
    canActivate: [LoggedIn],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
