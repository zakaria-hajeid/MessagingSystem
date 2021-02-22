import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-OrgnizationUser',
  templateUrl: './OrgnizationUser.component.html',
  styleUrls: ['./OrgnizationUser.component.css']
})
export class OrgnizationUserComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
user:User[]
  ngOnInit() {
    this.route.data.subscribe(
      data=>{this.user=data['Admin']

    })
    console.log(this.user)
}

}
