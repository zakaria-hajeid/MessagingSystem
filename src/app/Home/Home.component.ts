import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminService } from '../_services/Admin.service';
import { Organizations } from '../_models/Organizations';



@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userService: UserService, private adminService: AdminService, private authService: AuthService, private alertify: AlertifyService, private router: Router, private route: ActivatedRoute) { }
  users: User[];
  decodeToken: number;
  jwtHelper = new JwtHelperService();
  per: boolean;
  Role: any;
nameid:number
Updatestatus: User;


  ngOnInit() {
    const token = localStorage.getItem('token');

    this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    this.route.data.subscribe(
      data => {
        this.users = data['users'];

      }
    );


    this.Role = this.authService.decodedToken.role;
this.nameid=parseInt(this.authService.decodedToken.nameid)


  }
  onItemChange(value,id:number){
    if(value==true){
      for ( let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == id) {
  this.Updatestatus = this.users[i];
    }}
    this.Updatestatus.isActive=true;
    this.userService.updateUser(id,this.Updatestatus).subscribe(() => {
      this.alertify.success('Acivated Done !');},
    error => {this.alertify.error(error)});

    }
    else{
      for ( let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == id) {
  this.Updatestatus = this.users[i];
    }}
    this.Updatestatus.isActive=false;
    this.userService.updateUser(id,this.Updatestatus).subscribe(() => {
      this.alertify.message('Deacivated Done !');},
    error => {this.alertify.error(error)});
    }


  }
  checkActive(id:number){
    for ( let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
this.Updatestatus = this.users[i];
  }}
  if(this.Updatestatus.isActive==true)
    return true
    else
    return false


  }

  loggedOut() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['']);
  }
  reloadPage() {
    window.location.reload();
  }
  delet(id: number) {
    this.userService.deleteUser(id).subscribe(
      next => { this.alertify.success('Deleted success'); },
      error => { this.alertify.error(error); },
      () => { this.reloadPage(); }
    );

  }
  Prmation() {
    if (this.authService.decodedToken.role === 'Users') {
      return false;
    } else {
      return true;
    }
  }
}
