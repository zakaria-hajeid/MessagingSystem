import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
// import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  users: User[];
  Check: User;
   DoesntExist: Boolean ;
  constructor(public authService: AuthService, private route: ActivatedRoute, private alertify: AlertifyService, private router: Router, private userService: UserService) { }

  ngOnInit() {
this.DoesntExist=false;
    this.userService.getUsers().subscribe(
      (user: User[]) => {this.users = user; },
      error => {console.log(error); }
    );

  }
  login() {

    for ( let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === this.model.username) {
        if (this.users[i].isActive === true) {
          this.authService.login(this.model).subscribe(
            next => {this.alertify.success('Done'); },
            error => {this.alertify.error('Incorrect User Name or password'); },
           () => {this.router.navigate(['/home']); }
          );
        } else {
        this.alertify.error('This user is Deactivated');
        }
      }

    this.DoesntExist = true;
     }

    /*this.authService.login(this.model).subscribe(
      next=>{this.alertify.success('Done')},
      error=>{this.alertify.error("Incorrect User Name or password")},
     ()=>{this.router.navigate(['/home']);}
    )*/
    /*if (this.DoesntExist) {
      this.alertify.error('The User Doesnt Exist');
    }*/

  }


}
