export interface Inbox {
id:number,
senderId:number,
subject:string,
content:string,
messageSent:Date,
recipientId:number,
name:string,
email:string,
inTrash:boolean,
isRead?:boolean

}
