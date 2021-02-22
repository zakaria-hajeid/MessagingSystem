import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAdmin]'
})
export class AdminDirective {

  @Input() appAdmin: any;

  constructor(private Ten: ViewContainerRef, private Tem: TemplateRef<any>) { }
  ngOnInit() {


    if (this.appAdmin[0] != 'MainAdmin') {
      this.Ten.clear();
    } else {
      this.Ten.createEmbeddedView(this.Tem);
    }
  }
}
