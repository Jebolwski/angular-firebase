import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthguardService as LoggedIn } from './services/authguard.service';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home • Shopify' },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Signin • Shopify',
    canActivate: [LoggedIn],
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup • Shopify',
    canActivate: [LoggedIn],
  },
  {
    path: 'profile/:id/update',
    component: UpdateProfileComponent,
    title: 'Update Profile • Shopify',
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products • Shopify',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
