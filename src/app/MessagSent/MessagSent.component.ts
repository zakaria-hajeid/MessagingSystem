import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageToReturn } from '../_models/MessageToReturn';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { MessageService } from '../_services/Message.service';

@Component({
  selector: 'app-MessagSent',
  templateUrl: './MessagSent.component.html',
  styleUrls: ['./MessagSent.component.css']
})
export class MessagSentComponent implements OnInit {

  constructor(private alertify:AlertifyService,private authService:AuthService,private router:Router,private route:ActivatedRoute,private messageService:MessageService ) { }

  message: MessageToReturn[];

  ngOnInit() {
    this.route.data.subscribe(
      data=>{this.message=data['Mess']})


  }
  cancel(){
    this.router.navigate(['/Inbox/',this.route.snapshot.params["nameid"]]);
  }
}
