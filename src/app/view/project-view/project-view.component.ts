import { Component, OnInit,ViewChild } from '@angular/core';

import { SharedService } from 'src/app/service/shared.service';
import { DatePipe } from '@angular/common';
import { Project } from 'src/app/model/project';
import { Router } from '@angular/router';

import { ModalPopupComponent } from 'src/app/view/modal-popup/modal-popup.component';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  @ViewChild(ModalPopupComponent,{static:false}) modalPopup: ModalPopupComponent;

  projList:Project[];
  SearchProjId:number;
  selectedProject: any;
  public searchTerm:string;

  showModal: boolean;

  constructor(private service:SharedService,
              private router:Router,
              private datePipe: DatePipe) {
    this.service.GetAllProject().subscribe(x=> this.projList = x);
   }

  ngOnInit() {
  }

  SearchProjByID(id){
    this.service.GetProjectById(this.SearchProjId).subscribe(k=>this.projList=k);
  }

  btnUpdateClick(id)
  {
   this.router.navigate(["projectedit"],{queryParams:{ProjectID:id}});
  }

  btnSuspendClick(projId)
  {
    this.selectedProject = this.projList.find(proj => proj.ProjectID === projId);
    this.selectedProject.EndDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.selectedProject.Status = 'Suspended';


    this.service.UpdateProject(projId, this.selectedProject)
      .subscribe(
        data => {
          this.modalPopup.show();
          this.showModal = true;
          this.modalPopup.setContent("Project Has Been Suspended Successfully.!" , "Project");
        },
        error => {
          this.modalPopup.setContent("Request Failed!" , "");
        });
  }

}
