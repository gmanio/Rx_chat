import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Output() sendMessage = new EventEmitter();
  public text: string = "";

  constructor() {
  }

  public onClickSend() {
    this.sendMessage.emit(this.text);
    this.text = "";
  }
}
