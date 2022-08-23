import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLogoutGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user) => !!user),
      tap((isLogout) => {
        if (!isLogout) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }
  canActivateChild(): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user) => !!user),
      tap((isLogout) => {
        if (!isLogout) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }
}
