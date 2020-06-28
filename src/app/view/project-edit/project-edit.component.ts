import { Component, AfterContentInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { first } from 'rxjs/internal/operators/first';
import { Project } from 'src/app/model/project';
import { ModalPopupComponent } from 'src/app/view/modal-popup/modal-popup.component';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})

export class ProjectEditComponent implements AfterContentInit {

  @ViewChild(ModalPopupComponent,{static:false}) modalPopup: ModalPopupComponent;

  ProjectEditForm: FormGroup;
  submitted: boolean = false;
  projId: number;
  projectDetail: Project;

  showModal: boolean;
  content: string;

  constructor(private actroute: ActivatedRoute,
              private service: SharedService,
              private router: Router,
              private formbuilder: FormBuilder) {
    this.actroute.queryParams.subscribe(params => {
      this.projId = params.ProjectID;
    });

    this.service.GetProjectById(this.projId).subscribe(k => this.projectDetail = k);
  }

  ngAfterContentInit(): void {

    this.ProjectEditForm = this.formbuilder.group({
      ProjectName: ['', Validators.required],
      StartDate: ['2019-01-01'],
      EndDate: ['2019-12-30'],
      Priority: ['', Validators.required]
    });
  }

  get f() { return this.ProjectEditForm.controls; }


  onSubmit() {
    this.submitted = true;

    if (this.ProjectEditForm.invalid) {
      return;
    }


    this.service.UpdateProject(this.projId, this.ProjectEditForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.modalPopup.show();
          this.showModal = true;
          this.modalPopup.setContent("Project Details has been updated successfully", "User");
        },
        error => {
          this.modalPopup.show();
          this.showModal = true;
          this.modalPopup.setContent("Request Failed", "");
        });
    this.router.navigate(["projectview"]);
  }

  Cancel() {
    this.router.navigate(["projectview"]);
  }
}
