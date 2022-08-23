import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

const checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password').value;
  const confirmPassword = group.get('confirmPassword').value;

  return password === confirmPassword ? null : { notEqual: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: [''],
      },
      { validators: checkPasswords }
    );
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const { email, password } = this.form.value;
      this.authService
        .register(email, password)
        .then(() => {
          this.router.navigate(['/']);
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    }
  }
}
