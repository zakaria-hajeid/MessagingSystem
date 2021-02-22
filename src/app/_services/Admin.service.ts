import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organizations } from '../_models/Organizations';
import { PermationOrg } from '../_models/PermationOrg';
import { PermUser } from '../_models/PermUser';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl= environment.apiUrl+'Admin/' ;
  constructor(private http:HttpClient) { }
  getAdmins():Observable<Organizations[]>{
    return this.http.get<Organizations[]>(this.baseUrl);
  }
  Add(model:any) {
    console.log(this.baseUrl );
    return this.http.post(this.baseUrl, model);
  }
  getAdminsSpe(id):Observable<Organizations>{
    return this.http.get<Organizations>(this.baseUrl+id);
  }
 AddPerOrg(id:number,permationOrg:PermationOrg) {
    return this.http.post(this.baseUrl+'PermationOrganization/'+id, permationOrg);
  }
  AddPerUsers(id:number,permUser:PermUser) {
    return this.http.post(this.baseUrl+'PermationUsers/'+id, permUser);
  }
getPermationForUser(id:number):Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+'GetPermationForUser/'+id);
  }
  getPermationForOrganization(id:number):Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+'GetPermationOrganizationForUser/'+id);
  }
  getUserinOrg(id:number):Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+'GetUserinOrg/'+id);
  }






}
