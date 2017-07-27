import { Component, Input, OnInit } from '@angular/core';
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
  }

  public login() {
    this.firebaseService
      .login(this.id.concat('@sk.com'), this.password)
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
