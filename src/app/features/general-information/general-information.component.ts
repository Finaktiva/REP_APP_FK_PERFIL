import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonsService } from '../../shared/services/commons.service';
import { firstNumberPhone } from '../../shared/validators/custom-validators';
import { BaseService } from '../../shared/services/base.service';
import { CustomAsyncValidators } from '../../shared/validators/custom-async-validators';
import { UserService } from '../../shared/services/user.service';
import { ErrorsFormsComponent } from '../../shared/components/errors-forms/errors-forms.component';
import { NgClass } from '@angular/common';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ErrorsFormsComponent,
    ChangePasswordComponent,
    NgClass
  ],
  templateUrl: './general-information.component.html',
  styleUrl: './general-information.component.scss'
})
export class GeneralInformationComponent {
  form!: FormGroup;
  prefixesData: any[] = [];
  roles: any[] = [];
  sendData: {} = {};
  isSave: boolean = true;
  showForm: boolean = false;
  showModal:  boolean = false;
  userInfo: any;

  private commonsService = inject(CommonsService)
  private baseService = inject(BaseService)
  private userService = inject(UserService)

  constructor() {
    const session = this.baseService.getSession();
    this.getDataUser(session.idUser)
    this.sendData = {
      id: session.idUser
    }
  }

  ngOnInit() {
    this.commonsService.getPhonePrefixes().subscribe({
      next: (response: any) => {
        this.prefixesData = response.data
        this.prefixChanged('telephone', 'indicative')
      }
    })

    this.commonsService.getRoles().subscribe((response: any) => {
      this.roles = response.data
    })
  }

  getDataUser(id: any) {
    this.userService.getUserById(id).subscribe({
      next: response => {
        this.userInfo = response.data;
        this.buildForm();
        this.showForm = true;
      }
    })
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(this.userInfo.Name ?? "", [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)
      ]),
      lastName: new FormControl(this.userInfo.LastName ?? "", [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/)
      ]),
      typeDocument: new FormControl({ value: this.userInfo.TypeDocument ?? "CC", disabled: true }, Validators.required),
      numberIdentity: new FormControl({ value: this.userInfo.NumberIdentity ?? "", disabled: true }, [Validators.required, Validators.maxLength(10), Validators.pattern(/^\d*$/)]),
      indicative: new FormControl(this.userInfo.Indicative ?? "+57", Validators.required),
      telephone: new FormControl(this.userInfo.Telephone ?? "", [Validators.required, Validators.maxLength(12), Validators.minLength(12)]),
      email: new FormControl({ value: this.userInfo.Email ?? null, disabled: true }, [
        Validators.required,
        Validators.maxLength(70),
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        CustomAsyncValidators.finaktivaDomain,
      ],
        [
          CustomAsyncValidators.existsEmail(this.userService)
        ]),
      roleId: new FormControl(this.userInfo.RoleId ?? "", Validators.required),
    });
  }

  prefixChanged(field: string, type: string) {
    const isRequired = this.form.controls[field].hasValidator(Validators.required);
    this.form.controls[field].clearValidators();
    this.prefixesData.forEach(element => {
      if (element.Prefix === this.form.controls[type].value) {
        this.form.controls[field].addValidators([Validators.maxLength(Number(element.Length)), Validators.minLength(Number(element.Length)), Validators.pattern(/^\d*$/)]);
        if (element.Characters != "") {
          this.form.controls[field].addValidators([firstNumberPhone(element.Characters)]);
        }
        this.form.updateValueAndValidity();
        this.form.controls[field].updateValueAndValidity();
      }
      if (isRequired) {
        this.form.controls[field].addValidators(Validators.required)
        this.form.controls[field].updateValueAndValidity();
      }
    })
  }

  detectChanges(item: any) {
    this.isSave = false;
    const text: string = this.toCapitalize(item)
    this.sendData = { ...this.sendData, [text]: this.form.controls[item].value };
  }

  toCapitalize(text: any) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  saveData() {
    this.userService.updateUser(this.sendData).subscribe({
      next: (response) => {
        this.getDataUser(this.userInfo.id)
      }
    })
  }

  get nameField(): any { return this.form.get("name"); }
  get lastNameField(): any { return this.form.get("lastName"); }
  get typeDocumentField(): any { return this.form.get("typeDocument"); }
  get numberIdentityField(): any { return this.form.get("numberIdentity"); }
  get indicativeField(): any { return this.form.get("indicative"); }
  get telephoneField(): any { return this.form.get("telephone"); }
  get emailField(): any { return this.form.get("email"); }
  get roleIdField(): any { return this.form.get("roleId"); }

}
