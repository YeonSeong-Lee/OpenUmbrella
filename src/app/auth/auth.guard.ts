import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  if (!localStorage.getItem('token')) {
    // Redirect to login page
    window.location.href = '/login';
    return false; // Prevent navigation to the requested route
  }
  return true; // Allow navigation to the requested route
};
