import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators, passwordPattern } from '../../shared/validators/custom-validators';
import { ErrorsFormsComponent } from '../../shared/components/errors-forms/errors-forms.component';
import { ViewPasswordComponent } from '../../shared/components/view-password/view-password.component';
import { PasswordValidatorsComponent } from '../../shared/components/password-validators/password-validators.component';
import { LoginService } from '../../shared/services/login.service';
import { assetUrl } from '../../../single-spa/asset-url';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ErrorsFormsComponent,
    ViewPasswordComponent,
    PasswordValidatorsComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  check = assetUrl('icons/check.svg');
  successfulPassword:boolean = false;
  form!: FormGroup;
  isShowedPassword = false;
  errorCurrentPassword= false;
  @Input() email: string = "";
  @Output() closeModal = new EventEmitter<any>();
  
  private authService = inject(LoginService)

  constructor() {
    this.formBuild();
  }

  formBuild() {
    this.form = new FormGroup({
        currentPassword: new FormControl('', [
          Validators.required
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.maxLength(70),
          Validators.minLength(8),
          passwordPattern(),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.maxLength(70),
        ]),
      },
      { validators: CustomValidators.MatchPassword }
    );
  }

  edidtCurrentPassword(){
    this.errorCurrentPassword = false;
  }

  showPassword(): void {
    this.isShowedPassword = !this.isShowedPassword;
  }

  onfocus() {
    this.isShowedPassword = true;
  }

  onBlur() {
    this.isShowedPassword = false;
  }

  onSubmit(){
    const data = {
      email: this.email.toLowerCase(),
      oldPassword: this.currentPasswordField.value,
      newPassword: this.passwordField.value
    }

    console.log("data", data);
    

    this.authService.changePasswordByOldPassword(data).subscribe({
      next: Response => {
        this.successfulPassword = true;
        console.log("bien");
        
      },
      error: error => {
        this.errorCurrentPassword = true;
        console.log("malmalmal");
        
      }
    })
  }

  close(){
    this.successfulPassword = false
    this.closeModal.emit();
  }

  get currentPasswordField(): any { return this.form.get('currentPassword'); }
  get confirmPasswordField(): any { return this.form.get('confirmPassword'); }
  get passwordField(): any { return this.form.get('password'); }

}
