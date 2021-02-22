import { AuthGuard } from './_guards/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './login/login.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { RegisterComponent } from './Register/Register.component';
import { EditComponent } from './Edit/Edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MessageComponent } from './Message/Message.component';
import { InboxComponent } from './Inbox/Inbox.component';
import { memberInboxresolver } from './_resolvers/member-Inbox.resolver';
import { MessageDetailComponent } from './MessageDetail/MessageDetail.component';
import { MessageToReturn } from './_resolvers/MessageToReturn';
import { Adminresolver } from './_resolvers/Admin-resolver';
import { OrganizationsComponent } from './Organizations/Organizations.component';
import { ActiveUserComponent } from './ActiveUser/ActiveUser.component';
import { PermationsComponent } from './Permations/Permations.component';
import { PermationUserResolver } from './_resolvers/PermationUserResolver';
import { PermationOrganizationResolve } from './_resolvers/PermationOrganizationResolve';
import { memberInboxresolverForDetails } from './_resolvers/member-Inbox-resolverForDetailsMessage';
import { TrashComponent } from './Trash/Trash.component';
import { MessagSentComponent } from './MessagSent/MessagSent.component';
import { MessageSentToReturn } from './_resolvers/MessageSentToReturn';
import { DepartementComponent } from './Departement/Departement.component';
import { GetUserInOrgResolver } from './_resolvers/GetUserInOrgResolver';
import { OrgnizationUserComponent } from './OrgnizationUser/OrgnizationUser.component';



export const appRoutes: Routes = [
    { path: '', component: LoginComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always'
        , canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent,resolve:{

                users:MemberListResolver
            } },
            { path: 'Active', component: ActiveUserComponent,resolve:{

              Activ:MemberListResolver
          } },
           { path: 'register', component: RegisterComponent,resolve:{
             Admin:Adminresolver
           } },
           { path: 'Organizations', component: OrganizationsComponent },
           { path: 'Edit/:id', component: EditComponent,resolve:{
                user:MemberEditResolver
            } },
            { path: 'Permations/:id', component:PermationsComponent,resolve:{
              user:MemberListResolver,org:Adminresolver
          } },
            { path: 'Message/:nameid', component: MessageComponent,resolve:{
              PermUsers:PermationUserResolver,PerOrg:PermationOrganizationResolve
          } },
          { path: 'Inbox/:nameid', component:InboxComponent,resolve:{
            Inbox:memberInboxresolver
        } },
        { path: 'Trash/:nameid', component:TrashComponent,resolve:{
          Inbox:memberInboxresolver
      } },
      { path: 'MessageSent/:nameid', component:MessagSentComponent,resolve:{
        Mess:MessageSentToReturn
    } },
    { path: 'Departement', component:DepartementComponent,resolve:{
      Admin:Adminresolver
  } },
  { path: 'Departement/:nameid', component:OrgnizationUserComponent,resolve:{
    Admin:GetUserInOrgResolver
} },

        { path:'MessageDetailComponent/:nameid', component:MessageDetailComponent,resolve:{
          MessageToR:MessageToReturn,In:memberInboxresolverForDetails
      } }
        ]
    },

    { path: '**', redirectTo: '', pathMatch: 'full' }
];
