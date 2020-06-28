import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { SharedService } from 'src/app/service/shared.service';
import { first } from 'rxjs/internal/operators/first';
import { ParentTask } from 'src/app/model/parenttask';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  TaskAddForm: FormGroup;
  submitted: boolean = false;
  projectDetails: Project[];
  userDetails: User[];
  parentTaskDetails: ParentTask[];
  selectedParent: any;
  selectedUser: any;
  ProjectNme: string;
  selectedOption: any;
  showMsg: boolean = false;


  constructor(private service: SharedService,
    private router: Router,
    private formbuilder: FormBuilder,
    private datePipe: DatePipe) {
    this.service.GetAllProject().subscribe(k => this.projectDetails = k);
    this.service.GetAllParentTask().subscribe(k => this.parentTaskDetails = k);
    this.service.GetAllUser().subscribe(k => this.userDetails = k);
  }


  ngOnInit() {
    var date = new Date();
    var currentDate = this.datePipe.transform(date, "yyyy-MM-dd");
    date.setDate(date.getDate() + 1);
    var nextDate = this.datePipe.transform(date, "yyyy-MM-dd");
    this.TaskAddForm = this.formbuilder.group({
      ProjectId: ['', Validators.required],
      TaskName: ['', Validators.required],
      StartDate: [currentDate, Validators.required],
      EndDate: [nextDate, Validators.required],
      Priority: [0, Validators.min(1)],
      Status: ['', Validators.required],
      ParentId: [''],
      IsParent: [false],
      UserId:['']
    });
  }

  get f() { return this.TaskAddForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.TaskAddForm.invalid) {
      return;
    }

    if (!this.TaskAddForm.value['IsParent']) {
      this.TaskAddForm.controls['ParentId'].setValue(this.selectedParent.ParentId);
      this.TaskAddForm.controls['UserId'].setValue(this.selectedUser.UserID);
      this.service.AddTask(this.TaskAddForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.showMsg = true;
            this.router.navigate(["view-task"]);
          },
          error => {
            alert('Submission Failed')
          });
    }
    else {
      this.service.AddParentTask(this.TaskAddForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.showMsg = true;
            this.router.navigate(["view-task"]);
          },
          error => {
            alert('Submission Failed')
          });
    }
  }

  ResetTaskDetails() {
    this.TaskAddForm = this.formbuilder.group({
      ProjectId: '',
      ProjectNme: '',
      TaskName: '',
      StartDate: '',
      EndDate: '',
      Status: '',
      UserId: '',
      IsParent: false
    });
  }

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.TaskAddForm.controls['ProjectId'].setValue(this.selectedOption.ProjectID);
    this.ProjectNme = this.selectedOption.ProjectName;
  }

  onParentCheckStatusChange(isChecked: boolean) {
    if (!isChecked) {
      this.TaskAddForm.get('StartDate').enable();
      this.TaskAddForm.get('EndDate').enable();
      this.TaskAddForm.get('Priority').enable();
      this.TaskAddForm.get('ParentId').enable();
      this.TaskAddForm.get('UserId').enable();
      this.TaskAddForm.get('StartDate').updateValueAndValidity();
      this.TaskAddForm.get('EndDate').updateValueAndValidity();
      this.TaskAddForm.get('Priority').updateValueAndValidity();
      this.TaskAddForm.get('ParentId').updateValueAndValidity();
      this.TaskAddForm.get('UserId').updateValueAndValidity();
    }
    else {
      this.TaskAddForm.get('StartDate').reset();
      this.TaskAddForm.get('StartDate').disable();
      this.TaskAddForm.get('EndDate').reset();
      this.TaskAddForm.get('EndDate').disable();
      this.TaskAddForm.get('Priority').reset();
      this.TaskAddForm.get('Priority').disable();
      this.TaskAddForm.get('ParentId').reset();
      this.TaskAddForm.get('ParentId').disable();
      this.TaskAddForm.get('UserId').reset();
      this.TaskAddForm.get('UserId').disable();
      this.TaskAddForm.get('StartDate').clearValidators();
      this.TaskAddForm.get('EndDate').clearValidators();
      this.TaskAddForm.get('Priority').clearValidators();
      this.TaskAddForm.get('ParentId').clearValidators();
      this.TaskAddForm.get('UserId').clearValidators();
    }
  }
}
