import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Output()
  public sendMessage: EventEmitter<string> = new EventEmitter();
  public text: string = "";

  public requestMessage(){
    this.sendMessage.emit(this.text);
    this.text = "";
  }

  public onClickSendButton() {
    this.requestMessage();
  }

  public onKeyPress($event) {
    // press enter key
    if ( $event.keyCode == 13 ) {
      this.requestMessage();
    }
  }
}
