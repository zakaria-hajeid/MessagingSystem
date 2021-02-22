import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organizations } from '../_models/Organizations';

@Component({
  selector: 'app-Departement',
  templateUrl: './Departement.component.html',
  styleUrls: ['./Departement.component.css']
})
export class DepartementComponent implements OnInit {
  Org:Organizations[]
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      data=>{this.Org=data['Admin']
    })

}
}
