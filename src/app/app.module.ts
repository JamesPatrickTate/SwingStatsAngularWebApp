import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AgmCoreModule } from '@agm/core';




import { AppComponent } from './app.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { appRoutes } from '../routes';
import {ChatService} from './services/chat.service';
import {AuthService} from './services/auth.service';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShotlistComponent } from './shotlist/shotlist.component';
import { ShotComponent } from './shot/shot.component';
import { AvglistComponent } from './avglist/avglist.component';
import { AvgshotComponent } from './avgshot/avgshot.component';
import {ShotsService} from "./services/shots.service";
import { SearchComponent } from './search/search.component';
//AIzaSyBotTTO_JLE5Pb5O2bPhhBJUFZKrgDA5sk

@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent,
    DashboardComponent,
    ShotlistComponent,
    ShotComponent,
    AvglistComponent,
    AvgshotComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
   AngularFireAuthModule,
   AngularFireModule.initializeApp(environment.firebase),
   AgmCoreModule.forRoot({
    apiKey: 'AIzaSyBotTTO_JLE5Pb5O2bPhhBJUFZKrgDA5sk'
  })
  ],
  providers: [AuthService, ChatService, ShotsService],
  bootstrap: [AppComponent]
})
export class AppModule {  }
