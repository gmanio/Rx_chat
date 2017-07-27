import { RouterModule } from '@angular/router';
import { LoginComponent } from './container/login/login.component';

export const RootRouter = RouterModule.forRoot(
  [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }
  ],
  /**
   *  Some browsers does not support HTML5 pushstate.
   */
  {
    useHash: true
  }
)

