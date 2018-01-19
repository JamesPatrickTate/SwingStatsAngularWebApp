import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { ChatroomComponent } from './app/chatroom/chatroom.component';
import {DashboardComponent} from './app/dashboard/dashboard.component';
import {AvglistComponent} from "./app/avglist/avglist.component";

export const appRoutes: Routes = [
    { path: 'signup', component: SignupFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'chat', component: ChatroomComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'avglist', component: AvglistComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'},
];
