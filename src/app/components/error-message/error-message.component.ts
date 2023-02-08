import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  constructor(private authservice: AuthserviceService) {}
  @Input() max = 100000;
  @Input() min = 0;
  @Input() required!: boolean;
  @Input() form!: FormGroup;
  @Input() email = false;
  @Input() name!: string;
  @Input() name2!: string;
}
