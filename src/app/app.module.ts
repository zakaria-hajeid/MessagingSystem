import { MessageToReturn } from './_resolvers/MessageToReturn';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorInterceptorProvidor } from './_services/error.interceptor';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './Home/Home.component';
import { AuthGuard } from './_guards/auth.guard';
import { appRoutes } from './routes';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';

import { UserService } from './_services/user.service';
import { RegisterComponent } from './Register/Register.component';
import { EditComponent } from './Edit/Edit.component';
import { MessageComponent } from './Message/Message.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MessageService } from './_services/Message.service';
import { InboxComponent } from './Inbox/Inbox.component';
import { memberInboxresolver } from './_resolvers/member-Inbox.resolver';
import { MessageDetailComponent } from './MessageDetail/MessageDetail.component';
import { PermationsDirective } from './Shared/Directive/Permations.directive';
import { AdminService } from './_services/Admin.service';
import { Adminresolver } from './_resolvers/Admin-resolver';
import { OrganizationsComponent } from './Organizations/Organizations.component';
import { ActiveUserComponent } from './ActiveUser/ActiveUser.component';

import { AdminDirective } from './Shared/Directive/Admindirective';
import { PermationsComponent } from './Permations/Permations.component';
import { PermationUserResolver } from './_resolvers/PermationUserResolver';
import { PermationOrganizationResolve } from './_resolvers/PermationOrganizationResolve';
import { TabsModule } from 'ngx-bootstrap';
import { UnreadDirective } from './Shared/Directive/Unread.directive';
import { memberInboxresolverForDetails } from './_resolvers/member-Inbox-resolverForDetailsMessage';
//import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { TrashComponent } from './Trash/Trash.component';
import { ReplayAllHiddenDirective } from './Shared/ReplayAllHidden.directive';

import { MessagSentComponent } from './MessagSent/MessagSent.component';
import { MessageSentToReturn } from './_resolvers/MessageSentToReturn';
import { DepartementComponent } from './Departement/Departement.component';
import { OrgnizationUserComponent } from './OrgnizationUser/OrgnizationUser.component';
import { GetUserInOrgResolver } from './_resolvers/GetUserInOrgResolver';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    PermationsDirective,
    ReplayAllHiddenDirective,
    UnreadDirective,
    AppComponent,
    LoginComponent,
      HomeComponent,
      RegisterComponent,
      EditComponent,
      MessageComponent,
      InboxComponent,
      MessageDetailComponent,
      OrganizationsComponent,
      ActiveUserComponent,
      AdminDirective,
      PermationsComponent,
      TrashComponent,
      MessagSentComponent,
      DepartementComponent,
      OrgnizationUserComponent
   ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,


    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:44307'],
        blacklistedRoutes: ['localhost:44307/api/Auth/login'],
      }
    }),
    NgMultiSelectDropDownModule.forRoot(),

    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ]
  ,
  exports: [
    PermationsDirective,
    AdminDirective,
    UnreadDirective,
    ReplayAllHiddenDirective


  ],
  providers: [AuthService, AlertifyService, ErrorInterceptorProvidor, AuthGuard,
    UserService,
      MemberEditResolver,
      MessageSentToReturn
      ,
      MemberListResolver,
      MessageService,
      memberInboxresolver,
      MessageToReturn,
      AdminService,
      Adminresolver,PermationUserResolver,
      PermationOrganizationResolve,
      memberInboxresolverForDetails,
      GetUserInOrgResolver

  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
