import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthguardService as LoggedIn } from './services/authguard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Login' },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login • Warblogs',
    canActivate: [LoggedIn],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
