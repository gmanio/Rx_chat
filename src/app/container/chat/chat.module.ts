import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatContainer } from './chat-container';
import { BrowserModule } from '@angular/platform-browser';
import { ChatRouter } from './chat.routes';
import { ChatActivateGuard } from '../../services/chat-activate.guard';
import { InputComponent } from '../../components/input/input.component';
import { MessageListComponent } from '../../components/message-list/message-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ChatRouter
  ],
  declarations: [
    ChatContainer,
    InputComponent,
    MessageListComponent
  ],
  providers: [ChatActivateGuard]
})

export class ChatModule {
}
