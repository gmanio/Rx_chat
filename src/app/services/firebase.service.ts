import { EventEmitter, Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDDXPDJP-7UbwN-IbHGe6GMhmHtGEzzRMk',
  authDomain: 'ngrx-chat-8e2d5.firebaseapp.com',
  databaseURL: 'https://ngrx-chat-8e2d5.firebaseio.com',
  projectId: 'ngrx-chat-8e2d5',
  storageBucket: 'ngrx-chat-8e2d5.appspot.com',
  messagingSenderId: '67047827171'
};

class Message {
  private _timestamp: number;
  private _text: string;
  private _email: string;

  constructor(text) {
    this._text = text;
    this._timestamp = new Date().getTime();
  }

  get timestamp(): number {
    return this._timestamp;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}

@Injectable()
export class FirebaseService {
  public onMessageEmitter$: any = new EventEmitter();

  constructor() {
    firebase.initializeApp(config);
    this.onMessage();
  }

  public login(email: any, password: any) {
    const loginPromise = firebase.auth().signInWithEmailAndPassword(email, password);
    const login$ = Observable.fromPromise(loginPromise).share();

    return login$;
  }

  public onMessage() {
    firebase.database().ref('chat').on('value', (snapshot) => {
      debugger;
      // broadcast onMessage
      this.onMessageEmitter$.emit(snapshot);
    })
  }

  public sendMessage(text: string) {
    if ( this.isLoggined() ) {
      const message: Message = new Message(text);
      message.email = firebase.auth().currentUser.email;

      const newMessageRef = firebase.database().ref('chat').push();

      newMessageRef.set(message);
    }
  }

  public getCurrentUser() {
    return firebase.auth().currentUser;
  }

  public getData() {
    return Observable.fromPromise(firebase.database().ref('chat').once('value'))
  }

  public isLoggined(): boolean {
    return !!firebase.auth().currentUser;
  }

  public requestMessageClear() {
    return Observable.fromPromise(firebase.database().ref('chat').remove());
  }
}
