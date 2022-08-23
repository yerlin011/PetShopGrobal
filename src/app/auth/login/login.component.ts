import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const { email, password } = this.form.value;
      this.authService
        .login(email, password)
        .then(() => {
          this.router.navigate(['/']);
          this.loading = false;
        })
        .catch(() => (this.loading = false));
    }
  }
}
