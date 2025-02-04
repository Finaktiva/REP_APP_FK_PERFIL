import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-errors-forms',
  standalone: true,
  imports: [],
  templateUrl: './errors-forms.component.html',
  styleUrl: './errors-forms.component.scss'
})
export class ErrorsFormsComponent {

  errorMessage: string | undefined;
  @Input() typeError:string | undefined;

  @Input() set errors(value: any) {
    if (value) {
      if (value.required) {
        this.errorMessage = `Este campo es obligatorio`;
      }
      else if (value.max) {
        switch(this.typeError){
          case "currency":
          this.errorMessage = `Cantidad máxima es de ${this.format(value.max.max)}`;
          break;
          case "share":
          this.errorMessage = `Hemos ajustado la participación para no sobrepasar el 100%`;
          break;
          case "amount":
          this.errorMessage = `El monto ingresado supera el monto disponible`;
          break;
          case "percentage":
          this.errorMessage = `Cantidad máxima es de ${value.max.max}%`;
          break;
          default:
          this.errorMessage = `Longitud máxima es de ${value.max.max}`;
        }
      }
      else if(value.min){
        this.errorMessage = this.typeError == "currency" ?
                          `Cantidad mínima es de ${this.format(value.min.min)}`:
                          `Longitud mínima es de ${value.min.min}`;
      }
      else if (value.maxlength) {
        this.errorMessage = `Longitud máxima es de ${value.maxlength.requiredLength}`;
      }
      else if (value.minlength) {
        this.errorMessage = `Longitud mínima es de ${value.minlength.requiredLength} dígitos`;
      }
      else if (value.pattern) {
        switch(this.typeError){
          case "email":
          this.errorMessage = `Formato de correo no válido`;
          break;
          default:
          this.errorMessage = `Formato no válido`;
        }
      }
      else if (value.existsEmail){
        this.errorMessage = `El correo ya está registrado`;
      }
      else if (value.invalidEmail){
        this.errorMessage = `Ingrese un correo válido`;
      }
      else if (value.existsNit){
        this.errorMessage = `El nit ya está registrado`;
      }
      else if (value.trackingCodeExists){
        this.errorMessage = `El código no es válido`;
      }
      else if (value.passwordPattern){
        this.errorMessage = `La contraseña no cumple con los requisitos`;
      }
      else if (value.confirmPassword){
        this.errorMessage = `Las contraseñas no coinciden`;
      }
      else if (value.phoneFormat){
        this.errorMessage = `Escribe un número de celular válido`;
      }
      else if (value.existsNit){
        this.errorMessage = `La empresa ya está registrada.`;
      }
      else if (value.amountLess){
        this.errorMessage = `Ingresa un valor mayor al preaprobado.`;
      }
      else if (value.amountLimit){
        this.errorMessage = `El valor maximo para solicitar es 4.500'000.000.`;
      }
      else if (value.noExistLibera) {
        this.errorMessage = `El NIT no se encuentra registrado en libera`;
      }
      else {
        this.errorMessage = "";
      }
    } else {
      this.errorMessage = "";
    }
  }

  format(value:number){
    let formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });

    return formatter.format(value);
  }

}
