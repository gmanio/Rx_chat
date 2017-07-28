import {
  Component, Input, ElementRef, AfterContentChecked, EventEmitter, Output
} from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  @Input()
  public currentUser: any;
  @Input()
  public messageList = [];
  @Output()
  public requestMessageClear: any = new EventEmitter();
  @Input()
  public roomDate: Date = new Date();

  private elHost: any;

  constructor(private el: ElementRef) {
    this.elHost = this.el.nativeElement;
  }

  public scrollDown() {
    this.elHost.scrollTop = this.elHost.scrollHeight - this.elHost.clientHeight;
  }

  public getCurrentUser(email) {
    return this.currentUser.email == email;
  }

  public clearMessage() {
    this.requestMessageClear.emit();
  }
}
