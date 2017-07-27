import { RouterModule } from '@angular/router';
import { ChatContainer } from './chat-container';
import { ChatActivateGuard } from '../../services/chat-activate.guard';

export const ChatRouter = RouterModule.forChild(
  [
    { path: 'chat', component: ChatContainer, canActivate: [ChatActivateGuard] }
  ]
)

