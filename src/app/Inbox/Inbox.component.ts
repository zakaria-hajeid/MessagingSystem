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
  selector: 'app-Inbox',
  templateUrl: './Inbox.component.html',
  styleUrls: ['./Inbox.component.css']
})
export class InboxComponent implements OnInit {
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
MessagetoReturn:MessageForReturn
@ViewChild("myElem") MyProp: ElementRef;
nameid:number;
  ngOnInit() {

this.nameid=+this.route.snapshot.params["nameid"]
//console.log(this.nameid)
    this.route.data.subscribe(
      data=>{this.message=data['Inbox']})

this.retriveData()
/*console.log(this.MessageToDisplay)
console.log(this.messageService.isRead)*/


      }
  retriveData(){
    this.MessageToDisplay=[]
    for(let i=0;i<this.message.length;i++){


if(this.message[i].inTrash==false){

let obj={}
obj["id"]=this.message[i].id;
obj["subject"]=this.message[i].subject
obj["name"]=this.message[i].name
obj["messageSent"]=this.message[i].messageSent
if(this.messageService.isRead.length==0){
  obj["MessagidisRead"]=false;



  this.MessageToDisplay.push(obj)

}
else{
  if(this.messageService.isRead.some(val => val.id === this.message[i].id)){
    obj["MessagidisRead"]=true;
  }
  else{
    obj["MessagidisRead"]=false;
  }

  this.MessageToDisplay.push(obj)
}


/* this.MessageToDisplay[j]={}
this.MessageToDisplay[j].id=this.message[i].id
this.MessageToDisplay[j].subject=this.message[i].subject
this.MessageToDisplay[j].name=this.message[i].name
this.MessageToDisplay[j].messageSent=this.message[i].messageSent
j++;
*/
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
    this.router.navigate(['/home']);
  }
 /* isReadch(id:number){
    for(let i=0;i<this.authService.isRead;i++){
      if(this.authService.isRead[i].id==id){
        if(this.authService.isRead[i].isRead==true)
        return true;
        else
        return false
      }
    }


  }*/
  CheckIsRead(id:number){

    this.messageService.getMessageDetail(this.route.snapshot.params["nameid"],id).subscribe(
      (mess:MessageForReturn[])=>{/*this.Isread(mess[0].messageId)*/
        for(let i=0;i<mess.length;i++){

          if(mess[i].recipientId==this.route.snapshot.params["nameid"]){
            this.MessagetoReturn=mess[i]
          }
        }
       this.Isread(this.MessagetoReturn.isRead)

      },
      err=>{console.log(err)}

    )



   // console.log(this.MessageTor)
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
putIntoTrash(){
  if(this.trahMessageId.length!=0){
    this.trahMessageModel={messageId:this.trahMessageId};
    this.message=this.message.filter(val=>!this.trahMessageId.includes(val.id))
    this.messageService.isRead= this.messageService.isRead.filter(val=>!this.trahMessageId.includes(val.id))
    this.messageService.PutInTrash(this.route.snapshot.params["nameid"],this.trahMessageModel).subscribe(
      ()=>{  this.alertify.success('meassage puted')},
      error => { this.alertify.error(error) },
        ()=>{this.retriveData()}
    )
  }
  else
  {
    this.alertify.message('Please Select the Message')
  }

 // console.log(this.trahMessageId)
}
Isread(Value?:boolean){
  //console.log(this.MessagetoReturn.isRead)
return Value;
// console.log(this.authService.isRead);



  }

//this.isRead=Read;
//console.log(Read)
}


