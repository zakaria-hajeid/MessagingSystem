export interface sendMessage {
    SenderId:number;
    RecipientId:number[];
    subject:string;
    Content:string;
    senderName?:string

}
