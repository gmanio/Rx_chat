import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public id = '';
  public password = '';

  constructor(private firebaseService: FirebaseService,
              private router: Router) {

    this.firebaseService.onLoginEmitter$
      .subscribe((isLoggin: boolean) => {
        if ( isLoggin ) {
          this.router.navigate(['chat']);
        }
      })
  }

  public login() {
    const convertSKId: string = this.id.concat('@sk.com');

    this.firebaseService
      .login(convertSKId, this.password)
      .subscribe(() => {
        this.router.navigate(['chat']);
      })
  }
}

const Users = [
  // registered firebase users
  { email: 'user1@sk.com', pwd: '111115' },
  { email: 'user2@sk.com', pwd: '222225' }
]
