import {Injectable} from '@angular/core';
import {CanActivate} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotloggedinService implements CanActivate {
  constructor() {
  }

  canActivate(): boolean {
    return localStorage.getItem('user') == undefined;
  }
}
