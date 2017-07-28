import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

/**
 * Reducer
 */
import Reducer from './reducer';

/**
 * Router
 */
import { RootRouter } from './app.routes';

/**
 * Services
 */
import { FirebaseService } from './services/firebase.service';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './container/login/login.component';
import { FormsModule } from '@angular/forms';
import { ChatModule } from './container/chat/chat.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    ChatModule,
    RootRouter,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(Reducer)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
