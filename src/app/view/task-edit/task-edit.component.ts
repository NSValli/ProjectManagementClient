import { Component, OnInit, AfterContentInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { first } from 'rxjs/internal/operators/first';
import { Task } from 'src/app/model/task';
import { ParentTask } from 'src/app/model/parenttask';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { isNgTemplate } from '@angular/compiler';

import { ModalPopupComponent } from 'src/app/view/modal-popup/modal-popup.component';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements AfterContentInit {
  @ViewChild(ModalPopupComponent, {static:false}) modalPopup: ModalPopupComponent;

  projectDetails: Project[];
  userDetails: User[];
  parentTaskDetails: ParentTask[];
  TaskEditForm: FormGroup;
  submitted: boolean = false;
  taskId: number;
  task: Task;
  selectedParent: any;
  selectedProject: any;
  selectedUser: any;
  showModal: boolean;

  constructor(private actroute: ActivatedRoute,
    private service: SharedService,
    private router: Router,
    private formbuilder: FormBuilder,
    private datePipe: DatePipe) {
    this.actroute.queryParams.subscribe(params => {
      this.taskId = params.TaskID;
    });
    this.setData();
  }

  setData(){
    this.service.GetTask(this.taskId).subscribe(
      (data) => { this.task = data });
    this.service.GetAllUser().subscribe
      ((data) => {
        this.userDetails = data;
        this.selectedUser = data.find(user => user.UserID == this.task.UserId);
      });
    this.service.GetAllProject().subscribe
      ((data) => {
        this.projectDetails = data;
        this.selectedProject = data.find(project => project.ProjectID == this.task.ProjectId);
      });
    this.service.GetAllParentTask().subscribe
      ((data) => {
        this.parentTaskDetails = data;
        this.selectedParent = data.find(parentTask => parentTask.ParentId == this.task.ParentId);
    });
  }

  ngAfterContentInit(): void {
    this.TaskEditForm = this.formbuilder.group({
      ProjectId: ['', Validators.required],
      TaskName: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Priority: ['', Validators.required],
      Status: ['', Validators.required],
      UserId: ['', Validators.required],
      ParentId: ['', Validators.required]
    });
    this.selectedUser = this.userDetails.find(user => user.UserID == this.task.UserId);
  }

  get f() { return this.TaskEditForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.TaskEditForm.controls['ProjectId'].setValue(this.selectedProject.ProjectID);
    this.TaskEditForm.controls['ParentId'].setValue(this.selectedParent.ParentId);
    this.TaskEditForm.controls['UserId'].setValue(this.selectedUser.UserID);

    if (this.TaskEditForm.invalid) {
      return;
    }
    this.service.UpdateTask(this.taskId, this.TaskEditForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.modalPopup.show();
          this.showModal = true; // Show Confirmation Box
          this.modalPopup.setContent("Task Has Been Updated Successfully" , "Task");
        },
        error => {
          this.showModal = true; // Show Confirmation Box
          this.modalPopup.setContent("Request Failed","");
        });
        this.setData();
  }

  Cancel() {
    this.router.navigate(["taskview"]);
  }
}
