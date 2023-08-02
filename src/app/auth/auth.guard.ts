import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  if (!document.cookie.includes('jwt_token')) {
    // Redirect to login page
    window.location.href = '/login';
    return false;
  }
  return true;
};
