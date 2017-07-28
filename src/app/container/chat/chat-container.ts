import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { MessageListComponent } from '../../components/message-list/message-list.component';
import { Store } from '@ngrx/store';
import Message from '../../type/message.model';
import { ADD_MESSAGE } from '../../reducer/messageListReducer';

@Component({
  selector: 'app-chat-container',
  styleUrls: ['./chat-container.css'],
  template: `
    <app-message-list [messageList]="messageList" [currentUser]="getCurrentUser()"
                      (requestMessageClear)="requestMessageClear()"></app-message-list>
    <app-input (sendMessage)="sendMessage($event)"></app-input>
  `
})

export class ChatContainer {
  @ViewChild(MessageListComponent)
  private messageListComponent: MessageListComponent;
  public messageList: any = [];
  private messageListReducer;

  constructor(private firebaseService: FirebaseService,
              private cd: ChangeDetectorRef,
              private store: Store<any>) {
    this.messageListReducer = store.select('messageListReducer');

    this.firebaseService.getData()
      .subscribe((snapshot) => {
        if ( snapshot.exists() ) {
          this.messageList = Object
            .keys(snapshot.val())
            .map(key => snapshot.val()[key]);
        } else {
          this.messageList = [];
        }

        this.messageListComponent.scrollDown();
        this.cd.detectChanges();
      })

    this.firebaseService.onMessageEmitter$
      .subscribe((snapshot) => {
        if ( !snapshot.val() ) {
          this.messageList = [];
        } else {
          this.messageList = Object
            .keys(snapshot.val())
            .map(key => snapshot.val()[key]);
        }

        this.messageListComponent.scrollDown();
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
