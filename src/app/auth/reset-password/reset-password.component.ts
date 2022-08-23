import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

const checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const password = group.get('password').value;
  const confirmPassword = group.get('confirmPassword').value;

  return password === confirmPassword ? null : { notEqual: true };
};

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  form: FormGroup;
  oobCode: string = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: [''],
      },
      { validators: checkPasswords }
    );

    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode');
    if (!this.oobCode) {
      this.router.navigate(['/auth/login']);
    }
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  onSubmit() {
    if (this.form.valid && this.oobCode) {
      this.loading = true;
      const { password } = this.form.value;
      this.authService
        .resetPassword(password, this.oobCode)
        .then(() => {
          this.router.navigate(['/auth/login']);
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    }
  }
}
