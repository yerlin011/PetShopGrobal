import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Catalogo Mascotas', url: '/', icon: 'home' },
    { title: 'Crear nuevo', url: '/create', icon: 'paper-plane' },
  ];
  user$ = this.authService.user$;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
