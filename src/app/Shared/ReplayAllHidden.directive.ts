import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MessageForReturn } from '../_models/MessageForReturn';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appReplayAllHidden]'
})
export class ReplayAllHiddenDirective {

  @Input() appReplayAllHidden:any ;


  constructor(private Ten: ViewContainerRef, private Tem: TemplateRef<any>,private authService:AuthService) { }
  ngOnInit() {
let MessageTor:MessageForReturn[]=this.appReplayAllHidden


    if (this.ReplayallCheck(MessageTor)) {
      this.Ten.clear();
    } else {
      this.Ten.createEmbeddedView(this.Tem);
    }
  }
  ReplayallCheck(MessageTor:MessageForReturn[]){

    let num=0;
    for ( var i = 0; i < MessageTor.length; i++){
//console.log(MessageTor[i].recipientId)==undefind
      if(MessageTor[i].recipientId==parseInt(this.authService.decodedToken.nameid))
      {
        console.log(num)

        num++;
      }


    }


    if(num==0){
     return true
    }
    else
    return false
}
}

