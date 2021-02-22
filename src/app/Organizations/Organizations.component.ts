import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Organizations } from '../_models/Organizations';
import { AdminService } from '../_services/Admin.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-Organizations',
  templateUrl: './Organizations.component.html',
  styleUrls: ['./Organizations.component.css']
})
export class OrganizationsComponent implements OnInit {
  Add_Org: FormGroup;
  Organiza:Organizations
  constructor(private fb: FormBuilder,private router: Router,private admin:AdminService,private alertify: AlertifyService) { }

  ngOnInit() {
this.createOrganizationsForm();
  }
createOrganizationsForm() {
  this.Add_Org = this.fb.group({
    name: ['', Validators.required]

  })
}
Add(){

this.Organiza=Object.assign({}, this.Add_Org.value);

this.admin.Add(this.Organiza).subscribe(
  () => { this.alertify.success('Register Comleate') },
  error => { this.alertify.error(error); },
  () => { this.router.navigate(['/home']); }
)

}
cancel(){
  this.router.navigate(['/home']);
}

}
