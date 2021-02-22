import { MessageService } from './../_services/Message.service';
import { Inbox } from './../_models/Inbox';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";


import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { AdminService } from '../_services/Admin.service';

@Injectable()
export class PermationUserResolver implements Resolve<User[]>{
    constructor(private router:Router,private alertify:AlertifyService,private authService:AuthService,private adminService:AdminService){}
    resolve(route:ActivatedRouteSnapshot):Observable<User[]>{
        return this.adminService.getPermationForUser(route.params['nameid']).pipe(
          catchError(error => {
              this.alertify.error('Error occured when retriving the data');
              this.router.navigate(['']);
              return of(null);

          })
        )
    }
}
