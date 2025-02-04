import { Component, ElementRef, ViewChild } from '@angular/core';
import { assetUrl } from '../../../../single-spa/asset-url';

@Component({
  selector: 'app-view-password',
  standalone: true,
  imports: [],
  templateUrl: './view-password.component.html',
  styleUrl: './view-password.component.scss'
})
export class ViewPasswordComponent {
  hidePassword = assetUrl('icons/hide-password.svg');
  showPassword = assetUrl('icons/view-password.svg');

  @ViewChild("viewPassword") viewPassword!: ElementRef;
  show: boolean = true;

  constructor() { }

  toggle() {
    this.show = !this.show;
    let input = this.viewPassword.nativeElement.parentElement.previousSibling;
        input.type = !this.show ? 'text' : 'password';
  }
}
