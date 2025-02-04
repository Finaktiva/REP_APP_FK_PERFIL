import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { UserService } from '../services/user.service';

export class CustomAsyncValidators {
  static existsEmail(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService
        .searchEmail(control.value)
        .pipe(
          map((searchResponse: any) => {
            return !searchResponse.length ? control.errors : { existsEmail: true };
          })
        );
    };
  }
  static finaktivaDomain(control: AbstractControl) {

    if (control.value == null)
      return null;

    const emailArray = control.value.split('@');

    if (emailArray[1] === "finaktiva.com") {
      return { invalidEmail: true };
    }

    return null;
  }
}
