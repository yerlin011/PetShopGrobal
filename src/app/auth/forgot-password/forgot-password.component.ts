import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const { email } = this.form.value;
      this.authService
        .requestPassword(email)
        .then(() => {
          this.router.navigate(['/auth/login']);
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    }
  }
}
