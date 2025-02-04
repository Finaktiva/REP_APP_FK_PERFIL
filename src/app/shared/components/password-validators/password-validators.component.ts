import { Component, Input } from '@angular/core';
import { assetUrl } from '../../../../single-spa/asset-url';

@Component({
  selector: 'app-password-validators',
  standalone: true,
  imports: [],
  templateUrl: './password-validators.component.html',
  styleUrl: './password-validators.component.scss'
})
export class PasswordValidatorsComponent {
  
  validGreen = assetUrl('icons/valid-green.svg');
  validGray = assetUrl('icons/valid-gray.svg');

  _minLength: boolean = false;
  _mayus: boolean = false;
  _number: boolean = false;
  _symbol: boolean = false;
  _minus: boolean = false;

  @Input() set value(value: string) {
    this._minLength = Boolean(value.length >= 8);
    this._mayus = Boolean(value.match(/.*[A-Z]{1,}.*/g));
    this._number = Boolean(value.match(/.*\d{1,}.*/g));
    this._symbol = Boolean(value.match(/.*[!¡@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?¿]{1,}.*/g));
    this._minus = Boolean(value.match(/.*[a-z]{1,}.*/g));
  }

}
