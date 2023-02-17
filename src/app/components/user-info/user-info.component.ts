import {Component} from '@angular/core';
import {AuthserviceService} from "../../services/authservice.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  constructor(public authservice:AuthserviceService) {
  }
}
