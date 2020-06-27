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
