import { Component, OnInit,ViewChild,HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-Edit',
  templateUrl: './Edit.component.html',
  styleUrls: ['./Edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm
  user: User
  @HostListener('window:beforeunload',['$event'])
  unLoadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue=true;
    }
  }
  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute,private router :Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
  updateUser(id:number){
    this.userService.updateUser(id,this.user).subscribe(()=>{
      this.alertify.success('Saved !');
      this.editForm.reset(this.user);
     },error=>{this.alertify.error(error)},
     ()=>{this.router.navigate(['/home']);})}




}
