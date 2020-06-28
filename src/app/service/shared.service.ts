import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';

import {User} from 'src/app/model/user';
import {Project} from 'src/app/model/project';
import {Task} from 'src/app/model/task';
import {ParentTask} from 'src/app/model/parenttask';
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


    //Task Services - Start
    GetAllTask():Observable<any>
    {
        return this.http.get(this.url+"Task/GetAll").pipe(map((response:Response)=>response))
    }

    GetTask(id:number):Observable<any>
    {
        return this.http.get(this.url+`Task/Get/${id}`).pipe(map((response:Response)=>response))
    }

    AddTask(item:Task):Observable<any>
    {
        return this.http.post(this.url+"AddTask",item).pipe(map((response:Response)=>response))
    }

    UpdateTask(taskID:number,item:Task):Observable<any>
    {
        item.TaskId=taskID;
        return this.http.put(this.url+"EditTask",item).pipe(map((response:Response)=>response))
    }
    //Task Services  - End

    //Parent Task Services - Start
    GetAllParentTask():Observable<any>
    {
        return this.http.get(this.url+"ParentTask/GetAll").pipe(map((res:Response)=>res))
    }

    AddParentTask(item:ParentTask):Observable<any>
    {
        return this.http.post(this.url+"AddParentTask",item).pipe(map((res:Response)=>res))
    }
    //Parent Task Services - End

  }
