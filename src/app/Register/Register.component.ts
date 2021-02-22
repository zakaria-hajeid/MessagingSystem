import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Organizations } from '../_models/Organizations';
import { Register } from '../_models/Register';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  recepit_id=[];
  dropdownList = [];
  dropdownSettings:IDropdownSettings= {};
  selectedItems:User[]
  user: Register;
  x: any = {}
Org:Organizations[]
OrganizationId:number

  RoleList =[{value:'Users',display:'Users'},{value:'Admin',display:'Admin'}];

  constructor(private fb: FormBuilder,private route:ActivatedRoute, private router: Router, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(
      data=>{this.Org=data['Admin']
    })
    console.log(this.Org);


    this.createRegisterForm();
    this.dropdownList=this.Org;

    //this.x.g='M'
    this.dropdownSettings = {
      singleSelection: false,
      idField:'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: this.Org.length,
      allowSearchFilter: true
    };
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      selectOrg:['',Validators.required],
      selectRolr:['',Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator })
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value ? null : { 'mismatch': true };
  }
  register() {
    for ( var i = 0; i < this.selectedItems.length; i++) {
      this.recepit_id[i]=(this.selectedItems[i].id)
     }
   if (this.registerForm.valid) {
      // this.user = Object.assign({}, this.registerForm.value);
      this.user = {
        userName: this.registerForm.value['username'], password: this.registerForm.value['password'], name: this.registerForm.value['name']
        , email: this.registerForm.value['email'], phone: this.registerForm.value['phone'],OrganizationsId:this.recepit_id,
        role:this.registerForm.value['selectRolr']
      }
     // console.log(this.user)

      this.authService.register(this.user).subscribe(
        () => { this.alertify.success('Register Comleate') },
        error => { this.alertify.error(error); },
        () => { this.router.navigate(['/home']); }
      )
    }






}
  /*print(form:FormGroup){
    this.x=Object.assign({}, this.registerForm.value);

console.log(this.registerForm.value["phone"]);
  }*/

  cancel() {
    this.router.navigate(['/home']);

  }
}
