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
import {FavoritesComponent} from "./components/favorites/favorites.component";

const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Anasayfa'},
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Giriş Yap',
    canActivate: [NotLoggedIn],
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Kayıt Ol',
    canActivate: [NotLoggedIn],
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Ürünler',
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    title: 'Product • Shopify',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Sepetim',
    canActivate: [LoggedIn],
  }, {
    path: 'favorites',
    component: FavoritesComponent,
    title: 'Favorilerim',
    canActivate: [LoggedIn],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
