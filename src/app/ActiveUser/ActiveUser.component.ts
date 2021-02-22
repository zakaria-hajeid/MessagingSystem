import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-ActiveUser',
  templateUrl: './ActiveUser.component.html',
  styleUrls: ['./ActiveUser.component.css']
})
export class ActiveUserComponent implements OnInit {
  users: User[];
Updatestatus: User;
  constructor(private route: ActivatedRoute,private userService:UserService,private alertify: AlertifyService,) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.users = data['Activ'];

      }
    );

  }
  Active(id: number) {
    for ( let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
this.Updatestatus = this.users[i];
  }}
  this.Updatestatus.isActive=true;
  this.userService.updateUser(id,this.Updatestatus).subscribe(() => {
    this.alertify.success('Acivated Done !');},
  error => {this.alertify.error(error)});


  }
  Deactive(id: number) {
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
