import { Inbox } from './../_models/Inbox';
import { sendMessage } from './../_models/sendMessage';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MessageForReturn } from '../_models/MessageForReturn';
import { MessageInTrash } from '../_models/MessageInTrash';
import { MessageToReturn } from '../_models/MessageToReturn';


@Injectable({
  providedIn: 'root'
})
export   class MessageService {
   isRead=[]
  baseUrl = environment.apiUrl+'Users/';
constructor(private http: HttpClient) { }
SendMessage(id:number,message:sendMessage) {
  return this.http.post(this.baseUrl +id+'/Messages', message);
}
getMessageForSpeacifcUser(id:number):Observable<Inbox[]>{
  return this.http.get<Inbox[]>(this.baseUrl+id+'/Messages');
}
getMessageDetail(userId:number,id:number):Observable<MessageForReturn[]>{
  return this.http.get<MessageForReturn[]>(this.baseUrl+userId+'/Messages/'+id);
}
PutInTrash(id:number,messageInTrash:MessageInTrash) {
  return this.http.put(this.baseUrl +id+'/Messages',messageInTrash);
}
RstoreFromTrash(id:number,messageInTrash:MessageInTrash) {
  return this.http.put(this.baseUrl +id+'/Messages/RestoreFromTrash',messageInTrash);
}
DeleteFromTrash(id:number,messageInTrashd:MessageInTrash) {
  return this.http.put(this.baseUrl +id+'/Messages/DeleteMessag',messageInTrashd);
}
getMessagesent(userId:number):Observable<MessageToReturn[]>{
  return this.http.get<MessageToReturn[]>(this.baseUrl+userId+'/Messages/messageSent');
}
isReadfill(obj:any){

   this.isRead.push(obj)


}

}
