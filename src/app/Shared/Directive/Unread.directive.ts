import { Directive, TemplateRef, ViewContainerRef, OnInit, Input, ElementRef } from '@angular/core';
import { MessageForReturn } from 'src/app/_models/MessageForReturn';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'src/app/_services/Message.service';

@Directive({
  selector: '[appUnread]'
})
export class UnreadDirective implements OnInit {

  @Input() appUnread: number;
  constructor(private Ten: ViewContainerRef,private el: ElementRef,private authService:AuthService, private Tem: TemplateRef<any>,private messageService:MessageService) { }
  ngOnInit() {
    this.Ten.createEmbeddedView(this.Tem);
   /* this.messageService.getMessageDetail(this.authService.decodedToken.nameid,this.appUnread).subscribe(
      (mess:MessageForReturn[])=>{this.Isread(mess[0].isRead)},
      err=>{console.log(err)}

    )*/

document.querySelector("a").addEventListener("click", function() {
  console.log("hi")
});


}
check(){

}
Isread(Read:boolean){
  console.log(Read)

  }
}
