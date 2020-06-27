import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';

import {User} from 'src/app/model/user';
import {Project} from 'src/app/model/project';

import {PipeFilter} from 'src/app/pipe.filter';

@Injectable({
    providedIn: 'root'
  })

  export class SharedService {
    url:string='https://localhost:44373/';

    constructor(private http:HttpClient){}

    //Services for user starts here

    GetAllUser():Observable<any>
    {
      return this.http.get(this.url+"User/GetAll").pipe(map((res:Response)=>res))
    }

    GetUser(id:number):Observable<any>
    {
      return this.http.get(this.url+`User/Get/${id}`).pipe(map((res:Response)=>res))
    }

    AddUser(item:User):Observable<any>
    {
      return this.http.post(this.url+"AddUser",item).pipe(map((res:Response)=>res))
    }

    UpdateUser(id:number,item:User):Observable<any>
    {
      item.UserID=id;
      return this.http.put(this.url+"EditUser",item).pipe(map((res:Response)=>res))
    }

    DeleteUser(id:number):Observable<any>
    {
      return this.http.delete(this.url+`RemoveUser/${id}`).pipe(map((res:Response)=>res))
    }
    //Services for user ends here


    //Project Services - Start
    GetAllProject():Observable<any>
    {
      return this.http.get(this.url+"Project/GetAll").pipe(map((res:Response)=>res))
    }

    GetProjectById(id:number):Observable<any>
    {
      return this.http.get(this.url+`Project/Get/${id}`).pipe(map((res:Response)=>res))
    }

    AddProject(item:Project):Observable<any>
    {
      return this.http.post(this.url+"AddProject",item).pipe(map((res:Response)=>res))
    }

    UpdateProject(id:number,item:Project):Observable<any>
    {
      item.ProjectID=id;
      return this.http.put(this.url+"EditProject",item).pipe(map((res:Response)=>res))
    }

    DeleteProject(id:number):Observable<any>
    {
      return this.http.delete(this.url+`RemoveProject/${id}`).pipe(map((res:Response)=>res))
    }
    //Project Services - End

  }
