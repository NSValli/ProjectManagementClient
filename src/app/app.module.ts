import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAddComponent } from './view/user-add/user-add.component';
import { UserViewComponent } from './view/user-view/user-view.component';
import { ProjectAddComponent } from './view/project-add/project-add.component';
import { ProjectViewComponent } from './view/project-view/project-view.component';
import { TaskAddComponent } from './view/task-add/task-add.component';
import { TaskViewComponent } from './view/task-view/task-view.component';
import { MenuComponent } from './view/menu/menu.component';
import { ModalPopupComponent } from './view/modal-popup/modal-popup.component';
import {SharedService} from 'src/app/service/shared.service';
import {PipeFilter} from 'src/app/pipe.filter'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import {DatePipe} from '@angular/common';

//import { routes } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    UserAddComponent,
    UserViewComponent,
    ProjectAddComponent,
    ProjectViewComponent,
    TaskAddComponent,
    TaskViewComponent,
    MenuComponent,
    ModalPopupComponent,
    PipeFilter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  exports:[
    PipeFilter
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }



/*

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CONST_ROUTING} from './app.routing';
import { AddProjectComponent } from 'src/app/UI/add-project/add-project.component';
import {AddTaskComponent} from 'src/app/UI/add-task/add-task.component';
import {AddUserComponent} from 'src/app/UI/add-user/add-user.component';
import {UpdateProjectComponent} from 'src/app/UI/update-project/update-project.component';
import {UpdateTaskComponent} from 'src/app/UI/update-task/update-task.component';
import {UpdateUserComponent} from 'src/app/UI/update-user/update-user.component';
import {ViewProjectComponent} from 'src/app/UI/view-project/view-project.component';
import {ViewTaskComponent} from 'src/app/UI/view-task/view-task.component';
import {ViewUserComponent} from 'src/app/UI/view-user/view-user.component';
import { ModalPopupComponent } from 'src/app/UI/modal-popup/modal-popup.component';

import { MenuComponent } from './UI/menu/menu.component';
import {SharedService} from 'src/app/Service/shared.service';
import {FilterPipe} from 'src/app/filter.pipe'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    UpdateProjectComponent,
    UpdateTaskComponent,
    UpdateUserComponent,
    ViewProjectComponent,
    ViewTaskComponent,
    ViewUserComponent,
    MenuComponent,
    FilterPipe,
    ModalPopupComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CONST_ROUTING,
    FormsModule,
    TypeaheadModule.forRoot()
  ],

  exports:[
    FilterPipe
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]

})
export class AppModule { }
*/
