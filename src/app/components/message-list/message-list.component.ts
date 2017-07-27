import {
  Component, Input, ElementRef, AfterContentChecked, EventEmitter, Output
} from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements AfterContentChecked {
  @Input() currentUser: any;
  @Input() messageList = [];
  @Output() requestMessageClear: any = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  ngAfterContentChecked() {
    this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight - this.el.nativeElement.clientHeight;
  }

  public getCurrentUser(email) {
    return this.currentUser.email == email;
  }

  public clearMessage() {
    this.requestMessageClear.emit();
  }
}
