import { AbstractControl, ValidatorFn} from "@angular/forms";

export class CustomValidators {

  static MatchPassword(control: any):any {
    const password = control.get("password").value;
    const confirmPassword = control.get("confirmPassword").value;

    if (password !== confirmPassword) {
      control.get("confirmPassword").setErrors({ confirmPassword: true });
    } else {
      if (control.get("confirmPassword").hasError("confirmPassword")) {
        delete control.get("confirmPassword").errors["confirmPassword"];
        control.get("confirmPassword").updateValueAndValidity();
      }

      return null;
    }
  }

}

export function passwordPattern(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (!control.value) {
            return null;
        }

        const regex1 = Number(Boolean(control.value.match(/.*[A-Z]{1,}.*/g)));
        const regex2 = Number(Boolean(control.value.match(/.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,}.*/g)));
        const regex3 = Number(Boolean(control.value.match(/.*\d{1,}.*/g)));
        const regex4 = Number(Boolean(control.value.match(/.*[a-z]{1,}.*/g)));

        const typesChars = regex1 + regex2 + regex3 + regex4;

        const hasBlockedChars = Boolean(
            control.value.match(/.*[À-ÿ\u00f1\u00d1]{1,}.*/g)
        );

        if (typesChars < 4 || hasBlockedChars) {
            return { passwordPattern: true };
        }

        return null;
    };
}

export const matchEmail = (email: string, matchingEmail: string): ValidatorFn => {
  return (abstractControl: AbstractControl) => {
    const control = abstractControl.get(email);
    const matchingControl:any = abstractControl.get(matchingEmail);
    if (matchingControl?.errors && matchingControl.errors['confirmEmail']) {
      return null;
    }
    if (matchingControl?.value !== control?.value) {
      matchingControl.setErrors({ confirmEmail: true })
      const error = { confirmEmail: 'Los correos no coiniden.' }
      return error;
    } else {
      matchingControl?.setErrors(null);
      return null;
    }
  }
}

export function firstNumberPhone(initNumber:number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {

    const re = new RegExp(`^${initNumber}`);

    if (!re.test(control.value) && control.value != null && control.value != '') {
      return { phoneFormat: true };
    }

    return null;
  };
}
