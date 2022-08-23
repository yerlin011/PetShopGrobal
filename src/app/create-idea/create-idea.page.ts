import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { IdeasService } from '../core/services/ideas.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.page.html',
  styleUrls: ['./create-idea.page.scss'],
})
export class CreateIdeaPage {
  form: FormGroup;
  user: firebase.User;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private ideasService: IdeasService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(999),
        ],
      ],
    });

    this.authService.user$.subscribe((user) => (this.user = user));
  }

  get titleLength() {
    return this.form.value.title.length;
  }

  get descriptionLength() {
    return this.form.value.description.length;
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      const { title, description } = this.form.value;
      this.ideasService
        .create({
          title,
          description,
          author: this.user?.uid,
        })
        .then(() => {
          this.router.navigate(['/']);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
}
