import { EventEmitter, Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';
import Message from '../type/message.model';
import { Router } from '@angular/router';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCY9Z1Yx5Sq1Wch2jeqmPk0qq6nDqt7IIc",
  authDomain: "ngrx-chat-43e43.firebaseapp.com",
  databaseURL: "https://ngrx-chat-43e43.firebaseio.com",
  projectId: "ngrx-chat-43e43",
  storageBucket: "ngrx-chat-43e43.appspot.com",
  messagingSenderId: "253721186271"
};

@Injectable()
export class FirebaseService {
  public onLoginEmitter$: any = new EventEmitter();
  public onMessageEmitter$: any = new EventEmitter();

  constructor(public router: Router) {
    firebase.initializeApp(config);

    this.attachEventListener();
  }

  public attachEventListener() {
    firebase.auth()
      .onAuthStateChanged((user) => {
        if ( user ) {
          this.onLoginEmitter$.emit(true);
        } else {
          this.onLoginEmitter$.emit(false);
          this.router.navigate(['login']);
        }
      });

    this.onMessage();
  }

  public login(email: any, password: any) {
    const loginPromise = firebase.auth().signInWithEmailAndPassword(email, password);

    const login$ = Observable.fromPromise(loginPromise).share();

    return login$;
  }

  public onMessage() {
    firebase.database()
      .ref('chat')
      .on('value', (snapshot) => {
        // broadcast onMessage
        this.onMessageEmitter$.emit(snapshot);
      })
  }

  public sendMessage(text: string) {
    if ( this.isLoggined() ) {
      const message: Message = new Message();

      message.text = text;
      message.email = firebase.auth().currentUser.email;
      message.timestamp = new Date().toString();

      const newMessageRef = firebase.database().ref('chat').push();

      newMessageRef.set(message);
    }
  }

  public getCurrentUser() {
    return firebase.auth().currentUser;
  }

  public getData() {
    const firebaseDatabase = firebase.database().ref('chat');

    return Observable.fromPromise(firebaseDatabase.once('value'));
  }

  public isLoggined(): boolean {
    return !!firebase.auth().currentUser;
  }

  public requestMessageClear() {
    const firebaseDatabase = firebase.database().ref('chat');

    return Observable.fromPromise(firebaseDatabase.remove());
  }
}
