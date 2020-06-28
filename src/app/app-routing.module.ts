import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAddComponent} from 'src/app/view/user-add/user-add.component';
import {UserViewComponent} from 'src/app/view/user-view/user-view.component';
import {ProjectAddComponent} from 'src/app/view/project-add/project-add.component';
import {ProjectViewComponent} from 'src/app/view/project-view/project-view.component';
import {TaskAddComponent} from 'src/app/view/task-add/task-add.component';
import {TaskViewComponent} from 'src/app/view/task-view/task-view.component';


const routes: Routes = [
  {path:'useradd',component:UserAddComponent},
  {path:'userview',component:UserViewComponent},
  {path:'projectadd',component:ProjectAddComponent},
  {path:'projectview',component:ProjectViewComponent},
  {path:'taskadd',component:TaskAddComponent},
  {path:'taskview',component:TaskViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
