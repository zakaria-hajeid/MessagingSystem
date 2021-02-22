import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { UserService } from './../_services/user.service';

import { ActivatedRoute, Router } from '@angular/router';

import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { forEach } from '@angular/router/src/utils/collection';
import { sendMessage } from '../_models/sendMessage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../_services/Message.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AdminService } from '../_services/Admin.service';
import { DEFAULT_PACKAGE_URL_PROVIDER } from '@angular/platform-browser-dynamic/src/compiler_factory';


@Component({
  selector: 'app-Message',
  templateUrl: './Message.component.html',
  styleUrls: ['./Message.component.css']
})
export class MessageComponent implements OnInit {
  dropdownList = [];
  selectedItems:User[]
  PermUsers:User[];
  PermOrgnization:User[];

message:sendMessage;

recepit_id=[];
MessageForm:FormGroup;
UserSentArray:User[]
OrganizationName:String;
Role:string;

 uniqueObject = {};
SentPermationUser=[]
SentPermationOrg=[];


  dropdownSettings:IDropdownSettings= {};
  jwtHelper: any;
  constructor(private fb:FormBuilder,private adminService:AdminService,private authService:AuthService,private alertify:AlertifyService,private router:Router,private route:ActivatedRoute,private messageService:MessageService) { }

  ngOnInit() {


    this.route.data.subscribe(
      data=>{this.PermUsers=data['PermUsers'],
    this.PermOrgnization=data['PerOrg']
    }
    );
      for(var j= 0; j<this.PermUsers.length; j++){
      this.SentPermationUser[j]={};
      this.SentPermationUser[j].id=this.PermUsers[j].id
      this.SentPermationUser[j].username=this.PermUsers[j].username

    }

    for ( var i = 0; i < this.PermOrgnization.length; i++) {
this.getUser(this.PermOrgnization[i].orgId);
    }




   // console.log(this.SentPermationUser[6])


this.createMessageForm();

this.dropdownSettings = {
  singleSelection: false,
  idField:'id',
  textField:'username',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: this.SentPermationUser.length,
  allowSearchFilter: true
}


  }



getUser(id:number){
  this.adminService.getUserinOrg(id).subscribe(
    (user:User[])=>{


      for(var i= 0; i<user.length; i++){
        let obj={};
obj["id"]=user[i].id
obj["username"]=user[i].username
   this.SentPermationUser.push(obj)
    }
  }
    );

}

SetDrpoList(){
  for (let i in this.SentPermationUser) {

    // Extract the title
   let objTitle = this.SentPermationUser[i]['username'];

    // Use the title as the index
    this.uniqueObject[objTitle] = this.SentPermationUser[i];
}
for (let i in this.uniqueObject) {
  this.SentPermationOrg.push(this.uniqueObject[i]);
}
this.dropdownList=this.SentPermationOrg

}
  createMessageForm() {
    this.MessageForm = this.fb.group({
      Subject:[''],
      Content: [''],

    })


  }
 /* onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }*/
  SendMessage(){
  //  console.log(this.selectedItems)
try{
  for ( var i = 0; i < this.selectedItems.length; i++) {
    this.recepit_id[i]=(this.selectedItems[i].id)
   }


   this.message={SenderId:parseInt(this.authService.decodedToken.nameid),RecipientId:this.recepit_id,subject:this.MessageForm.value['Subject'],Content:this.MessageForm.value['Content']}

   //console.log(this.message)

   this.messageService.SendMessage(this.authService.decodedToken.nameid,this.message).subscribe(
     ()=>{  this.alertify.success('Send Done')},
     error => { console.log(error) },
     ()=>{ this.router.navigate(['/home']);}
   );

}
catch{
  this.alertify.error("You should select at least one Recipient")
}



  }

  cancel(){
   this.router.navigate(['/home']);



  }

}
