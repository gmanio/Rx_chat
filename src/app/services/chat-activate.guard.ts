import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from './firebase.service';

@Injectable()
export class ChatActivateGuard implements CanActivate {
  constructor(private firebase: FirebaseService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.firebase.isLoggined() ) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
