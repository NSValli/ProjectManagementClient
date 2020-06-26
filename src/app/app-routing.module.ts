import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAddComponent} from 'src/app/view/user-add/user-add.component';
import {UserViewComponent} from 'src/app/view/user-view/user-view.component';


const routes: Routes = [
  {path:'userAdd',component:UserAddComponent},
  {path:'userView',component:UserViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/*import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddProjectAddComponent} from 'src/app/UI/add-project/add-project.component';
import {AddTaskComponent} from 'src/app/UI/add-task/add-task.component';
import {AddUserComponent} from 'src/app/UI/add-user/add-user.component';
import {UpdateProjectComponent} from 'src/app/UI/update-project/update-project.component';
import {UpdateTaskComponent} from 'src/app/UI/update-task/update-task.component';
import {UpdateUserComponent} from 'src/app/UI/update-user/update-user.component';
import {ViewProjectComponent} from 'src/app/UI/view-project/view-project.component';
import {ViewTaskComponent} from 'src/app/UI/view-task/view-task.component';
import {ViewUserComponent} from 'src/app/UI/view-user/view-user.component';


const MAINMENU_ROUTES: Routes = [
    { path: '', redirectTo: '/add-project', pathMatch: 'full' },
    {path:'add-task',component:AddTaskComponent},
    {path:'update-task',component:UpdateTaskComponent},
    {path:'view-task',component:ViewTaskComponent},
    {path:'add-project',component:AddProjectComponent},
    {path:'update-project',component:UpdateProjectComponent},
    {path:'view-project',component:ViewProjectComponent},
    {path:'add-user',component:AddUserComponent},
    {path:'update-user',component:UpdateUserComponent},
    {path:'view-user',component:ViewUserComponent}

  ];

  export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);
*/
