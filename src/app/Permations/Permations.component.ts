import { User } from './../_models/user';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Organizations } from '../_models/Organizations';
import { AdminService } from '../_services/Admin.service';
import { PermationOrg } from '../_models/PermationOrg';
import { PermUser } from '../_models/PermUser';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-Permations',
  templateUrl: './Permations.component.html',
  styleUrls: ['./Permations.component.css']
})
export class PermationsComponent implements OnInit {
  org:Organizations[];
  user:User[];
  permationOrg:PermationOrg;
  permUser:PermUser
perOrgId=[]
perUserId=[];
  dropdownListForOrg = [];
  dropdownListForUsers = [];
  selectedItemsForOrg = [];
  selectedItemsForUsers = [];
  dropdownSettingsFororg:IDropdownSettings= {};
  dropdownSettingForUsers:IDropdownSettings= {};
  constructor(private route:ActivatedRoute,private router:Router,private adminService:AdminService,private alertify:AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(
      data=>{this.org=data['org'],
      this.user=data['user']

    })
    this.dropdownListForOrg=this.org;
    this.dropdownListForUsers=this.user


    this.dropdownSettingForUsers= {
      singleSelection: false,
      idField:'id',
      textField:'username',
      selectAllText:'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit:this.user.length,
      allowSearchFilter: true
    };
    this.dropdownSettingsFororg = {
      singleSelection: false,
      idField:'id',
      textField:'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: this.org.length,
      allowSearchFilter: true
    };
  }
  cancel() {
    this.router.navigate(['/home']);

  }
  Add(){
    if(this.selectedItemsForOrg.length!=0){
      for ( var i = 0; i < this.selectedItemsForOrg.length; i++) {
        this.perOrgId[i]=(this.selectedItemsForOrg[i].id)
       }
      this.permationOrg={organizationId:this.perOrgId}
      this.adminService.AddPerOrg(+this.route.snapshot.params["id"],this.permationOrg).subscribe(
        () => { this.alertify.success('Add Comleate') },
        error => { this.alertify.error("The Permation Is Already Added"); },
        () => { this.router.navigate(['/home']); }
      )
    }
    if(this.selectedItemsForUsers.length!=0){
      for ( var i = 0; i < this.selectedItemsForUsers.length; i++) {
        this.perUserId[i]=(this.selectedItemsForUsers[i].id)
       }
      this.permUser={userId:this.perUserId}
      this.adminService.AddPerUsers(+this.route.snapshot.params["id"],this.permUser).subscribe(
        () => { this.alertify.success('Add Comleate') },
        error => { this.alertify.error("The Permation Is Already Added"); },
        () => { this.router.navigate(['/home']); }
      )
    }

  }
check(){
  if(this.selectedItemsForOrg.length==0 && this.selectedItemsForUsers.length==0 )
  return true
  return false

}

}
