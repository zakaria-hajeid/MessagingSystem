import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class MemberEditResolver implements Resolve<User>{
    constructor(private userService:UserService,private authService:AuthService
        ,private router:Router,private alertify:AlertifyService){}
    resolve(route:ActivatedRouteSnapshot):Observable<User>{
        return this.userService.getUser(route.params['id']).pipe(
          catchError(error => {
              this.alertify.error('Error occured when retriving the data');
              this.router.navigate(['/home']);
              return of(null);

          })
        )
    }
}
