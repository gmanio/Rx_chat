import { ChangeDetectorRef, Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-container',
  styleUrls: ['./chat-container.css'],
  template: `
    <app-message-list [messageList]="messageList" [currentUser]="getCurrentUser()"
                      (requestMessageClear)="requestMessageClear()"></app-message-list>
    <app-input (sendMessage)="sendMessage($event)"></app-input>
  `,
})

export class ChatContainer {
  public messageList: any = [];

  constructor(private firebaseService: FirebaseService,
              private router: Router,
              private cd: ChangeDetectorRef) {
    this.firebaseService.getData().subscribe((snapshot) => {
      if ( !snapshot.val() ) {
        this.messageList = [];
      } else {
        this.messageList = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
      }
      this.cd.detectChanges();
    })

    this.firebaseService.onMessageEmitter$.subscribe((snapshot) => {
      if ( !snapshot.val() ) {
        this.messageList = [];
      } else {
        this.messageList = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
      }
      this.cd.detectChanges();
    })
  }

  public sendMessage(text) {
    this.firebaseService.sendMessage(text)
  }

  public getCurrentUser() {
    return this.firebaseService.getCurrentUser();
  }

  public requestMessageClear() {
    this.firebaseService.requestMessageClear()
      .subscribe(
        () => {
          //remove success;
          this.messageList = [];
        });
  }
}
