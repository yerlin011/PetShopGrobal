import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent{

 
    public appPages = [
      { title: 'Mascotas', url: '/', icon: 'bulb' },
      { title: 'Articulos', url: '/create', icon: 'paper-plane' },
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
