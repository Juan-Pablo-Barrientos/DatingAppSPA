import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AlertifyService } from '../../shared/services/alertify.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const alertify = inject(AlertifyService);
  if(authService.loggedIn()){
    return true
  }
  alertify.error('You shall not pass!!!');
  router.navigate(['/home']);
  return false
};
