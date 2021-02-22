
import { MessageInTrash } from './../_models/MessageInTrash';
import { UserService } from './../_services/user.service';
import { MessageToReturn } from './../_resolvers/MessageToReturn';
import { Inbox } from './../_models/Inbox';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { MessageService } from '../_services/Message.service';
import { MessageForReturn } from '../_models/MessageForReturn';
import { AuthService } from '../_services/auth.service';



@Component({
  selector: 'app-Trash',
  templateUrl: './Trash.component.html',
  styleUrls: ['./Trash.component.css']
})
export class TrashComponent implements OnInit {

  constructor(private alertify:AlertifyService,private authService:AuthService,private router:Router,private route:ActivatedRoute,private messageService:MessageService ) { }

  message: Inbox[];
senderName:string;
isRead:boolean;
ReadFlag:boolean=false;
ID:Number;
isREAD=[];
trahMessageId:number[]=[];
MessageToDisplay=[]

trahMessageModel:MessageInTrash
@ViewChild("myElem") MyProp: ElementRef;
//nameid:number;
  ngOnInit() {
//this.nameid=parseInt(this.authService.decodedToken.nameid)
    this.route.data.subscribe(
      data=>{this.message=data['Inbox']})
      for(let i=0;i<this.message.length;i++){


if(this.message[i].inTrash==true){
  let obj={}
  obj["id"]=this.message[i].id;
  obj["subject"]=this.message[i].subject
  obj["name"]=this.message[i].name
  obj["messageSent"]=this.message[i].messageSent
  this.MessageToDisplay.push(obj)

}



      }


//console.log(this.MessageToDisplay)
//this.ReadFlag=this.authService.isRead


  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}
reloadPage() {
  window.location.reload();
}

  cancel(){
    this.router.navigate(['/Inbox/',this.route.snapshot.params["nameid"]]);
  }
  deleteMessage(){
    this.trahMessageModel={messageId:this.trahMessageId};
    this.messageService.DeleteFromTrash(this.route.snapshot.params["nameid"],this.trahMessageModel).subscribe(
      ()=>{  this.alertify.success('meassage Deleted Permently')},
      error => { this.alertify.error(error) },
        ()=>{this.router.navigate(['/Inbox/',this.route.snapshot.params["nameid"]]);
      }
    )
  }
  RestoreMessage(){

    for(let i=0;i<this.trahMessageId.length;i++){

        let obj={}
        obj["id"]=this.trahMessageId[i]
        obj["isRead"]=true
        //this.messageService.isRead.push(obj)
        this.messageService.isReadfill(obj)



    }
    if(this.trahMessageId.length!=0){
      this.trahMessageModel={messageId:this.trahMessageId};
      this.messageService.RstoreFromTrash(this.route.snapshot.params["nameid"],this.trahMessageModel).subscribe(
        ()=>{  this.alertify.success('meassage Restored')},
        error => { this.alertify.error(error) },
          ()=>{this.router.navigate(['/Inbox/',this.route.snapshot.params["nameid"]]);
        }
      )
    }
    else{
      this.alertify.message('Please Select the Message')
    }

  }
  onItemChange(value,id:number){

    if(value==true){


this.trahMessageId.push(id);

  }
  else{
  for(let i=0;i<this.trahMessageId.length;i++){
if(this.trahMessageId[i]==id){
 // delete this.trahMessageId[i]
 let index = 1;
  this.trahMessageId.splice(i, 1)
}
  }
  }

}

}
