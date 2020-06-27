import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { first } from 'rxjs/internal/operators/first';

import { ModalPopupComponent } from 'src/app/view/modal-popup/modal-popup.component';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  @ViewChild(ModalPopupComponent,{static:false}) modalPopup: ModalPopupComponent;

  ProjectAddForm: FormGroup;
  submitted: boolean = false;
  userDetails: any[];
  selectedUser: any;
  showModal: boolean;

  constructor(private datePipe: DatePipe,
    private service: SharedService,
    private router: Router,
    private formbuilder: FormBuilder) {
    this.service.GetAllUser().subscribe(x => this.userDetails = x);
  }

  ngOnInit() {
    this.setDefaultValue();
  }

  setDefaultValue() {
    this.ProjectAddForm = this.formbuilder.group({
      ProjectName: ['', Validators.required],
      StartDate: [''],
      EndDate: [''],
      Priority: [0,  Validators.min(1)],
      UserID:['',Validators.required],
      Status:['New']
    });
  }

  get f() { return this.ProjectAddForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.ProjectAddForm.invalid) {
      return;
    }

    this.ProjectAddForm.controls['UserID'].setValue(this.selectedUser.UserID);

    this.service.AddProject(this.ProjectAddForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.modalPopup.show();
          this.showModal = true;
          this.modalPopup.setContent("Project Has Been Added Successfully.!" , "Project");
        },
        error => {
          this.modalPopup.show();
          this.modalPopup.setContent("Request Failed!" , "Project");
        });
  }


  ResetProjectDetails() {
    this.ProjectAddForm = this.formbuilder.group({
      ProjectName: '',
      StartDate: '',
      EndDate: '',
      Priority: '',
      UserID:''
    });
  }

  setDate(isChecked: boolean) {
    var date = new Date();
    var currentDate = this.datePipe.transform(date, "yyyy-MM-dd");
    date.setDate(date.getDate() + 1);
    var nextDate = this.datePipe.transform(date, "yyyy-MM-dd");
    if (!isChecked) {
      this.ProjectAddForm.controls['StartDate'].disable();
      this.ProjectAddForm.controls['EndDate'].disable();
      this.ProjectAddForm.controls['StartDate'].setValue('');
      this.ProjectAddForm.controls['EndDate'].setValue('');
      this.ProjectAddForm.controls['StartDate'].setValidators(null);
      this.ProjectAddForm.controls['EndDate'].setValidators(null);
    } else {
      this.ProjectAddForm.controls['StartDate'].enable();
      this.ProjectAddForm.controls['EndDate'].enable();
      this.ProjectAddForm.controls['StartDate'].setValue(currentDate);
      this.ProjectAddForm.controls['EndDate'].setValue(nextDate);
      this.ProjectAddForm.controls['StartDate'].setValidators([Validators.required]);
      this.ProjectAddForm.controls['EndDate'].setValidators([Validators.required]);
    }
  }

}
