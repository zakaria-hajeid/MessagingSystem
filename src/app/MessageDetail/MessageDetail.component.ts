import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { InboxComponent } from '../Inbox/Inbox.component';

import { Inbox } from '../_models/Inbox';
import { MessageForReturn } from '../_models/MessageForReturn';
import { sendMessage } from '../_models/sendMessage';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { MessageService } from '../_services/Message.service';

@Component({
  selector: 'app-MessageDetail',
  templateUrl: './MessageDetail.component.html',
  styleUrls: ['./MessageDetail.component.css']
})
export class MessageDetailComponent implements OnInit {
MessageTor:MessageForReturn[]
messageDisplay:MessageForReturn
message: Inbox[];
email:string
messagesend:sendMessage;
recepit_id:number;
subject:string
content:string
constructor(private route:ActivatedRoute,private alertify:AlertifyService,private messageService:MessageService,private authService:AuthService,private router:Router) { }

  ngOnInit() {


    this.route.data.subscribe(
      data=>{this.MessageTor=data['MessageToR'],
    this.message=data['In']
    })

      this.InitilizObject()

      for ( var i = 0; i < this.message.length; i++){
        if(this.message[i].id==+this.route.snapshot.params['nameid']){
          this.email= this.message[i].email
          this.recepit_id=this.message[i].senderId
        }

       }
       for(let i=0;i<this.MessageTor.length;i++){

        if(this.MessageTor[i].recipientId==this.authService.decodedToken.nameid){
          if(this.messageService.isRead.length==0){

            let obj={}
            obj["id"]=this.MessageTor[i].messageId
            obj["isRead"]=this.MessageTor[i].isRead
            //this.messageService.isRead.push(obj)
            this.messageService.isReadfill(obj)

          }
          else{

            if( !this.messageService.isRead.some(val => val.id === this.MessageTor[i].messageId)){
              let obj={}
              obj["id"]=this.MessageTor[i].messageId
              obj["isRead"]=this.MessageTor[i].isRead
             // this.messageService.isRead.push(obj)
             this.messageService.isReadfill(obj)
            }

          }



        }
      }
    // this.Isread(this.MessagetoReturn.isRead)



//console.log( this.recepit_id)

  }
  InitilizObject(){
    this.messageDisplay={subject:this.MessageTor[0].subject,content:this.MessageTor[0].content,userName:this.authService.decodedToken.unique_name};



  }
  cancel(){
    this.router.navigate(['/Inbox/',this.authService.decodedToken.nameid]);
  }
  sendReplay(){
this.messagesend={SenderId:parseInt(this.authService.decodedToken.nameid),RecipientId:[this.recepit_id],subject:this.subject,Content:this.content}
this.messageService.SendMessage(this.authService.decodedToken.nameid,this.messagesend).subscribe(
  ()=>{  this.alertify.success('Send Done')},
  error => { console.log(error) },
  ()=>{ this.router.navigate(['/Inbox/',this.authService.decodedToken.nameid]);}
);
  }
  sendReplayAll(){
    let recept_id =[]
    for ( var i = 0; i < this.MessageTor.length; i++){
      if(this.MessageTor[i].recipientId!=parseInt(this.authService.decodedToken.nameid))
      recept_id[i]=this.MessageTor[i].recipientId

    }

recept_id.push(this.recepit_id);


    this.messagesend={SenderId:parseInt(this.authService.decodedToken.nameid),RecipientId:recept_id,subject:this.subject,Content:this.content}
    console.log(this.messagesend)
this.messageService.SendMessage(this.authService.decodedToken.nameid,this.messagesend).subscribe(
  ()=>{  this.alertify.success('Send Done')},
  error => { console.log(error) },
  ()=>{ this.router.navigate(['/Inbox/',this.authService.decodedToken.nameid]);}
);
  }
  ReplayHidden(valu?:boolean){
if(valu==true)
return true;
else
return false;
  }
  ReplayallCheck(){
    let num=0;
    for ( var i = 0; i < this.MessageTor.length; i++){
      if(this.MessageTor[i].recipientId!=parseInt(this.authService.decodedToken.nameid))
      {
        num++;
      }

    }

    if(num==1){
      return true;

    }
    else
    return false;

  }

}
