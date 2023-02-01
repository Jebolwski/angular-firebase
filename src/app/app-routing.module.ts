import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthguardService as LoggedIn } from './services/authguard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Login' },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Signin • Warblogs',
    canActivate: [LoggedIn],
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign up • Warblogs',
    canActivate: [LoggedIn],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
