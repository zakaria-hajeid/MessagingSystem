import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPermations]'
})
export class PermationsDirective implements OnInit {
  @Input() appPermations: any;

  constructor(private Ten: ViewContainerRef, private Tem: TemplateRef<any>) { }
  ngOnInit() {


    if (this.appPermations[0] === 'Users') {
      this.Ten.clear();
    } else {
      this.Ten.createEmbeddedView(this.Tem);
    }
  }

}
