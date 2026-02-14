import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const alreadyAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
// console.log(authService.isAuthenticated());
// console.log(authService.currentUser());
  if (!authService.isAuthenticated()) {
      return true;
    }
        
        return router.navigate(["/jobs"]);
    

};
