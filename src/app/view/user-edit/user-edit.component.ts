import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { first } from 'rxjs/internal/operators/first';
import { User } from 'src/app/model/user';

import { ModalPopupComponent } from 'src/app/view/modal-popup/modal-popup.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements AfterContentInit {

  @ViewChild(ModalPopupComponent,{static:false}) modalPopup: ModalPopupComponent;

  UpdateUserForm: FormGroup;
  submitted: boolean = false;
  userid: number;
  userList: User;
  showModal: boolean;

  constructor(private actroute: ActivatedRoute, private service: SharedService,
    private router: Router,
    private formbuilder: FormBuilder) {
    this.actroute.queryParams.subscribe(params => {
      this.userid = params.UserID;
    });
    this.setData();
  }

  setData() {
    this.service.GetUser(this.userid).subscribe(x => this.userList = x);
  }

  ngAfterContentInit(): void {
    this.UpdateUserForm = this.formbuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmployeeID: ['', Validators.required]
    });
  }

  get f() { return this.UpdateUserForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.UpdateUserForm.invalid) {
      return;
    }
    this.service.UpdateUser(this.userid, this.UpdateUserForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.modalPopup.show();
          this.showModal = true;
          this.modalPopup.setContent("User Details Has Been Updated Successfully" , "User");
        },
        error => {
          this.showModal = true;
          this.modalPopup.setContent("Submission Failed","");
        });
   }

  Cancel() {
    this.router.navigate(["userview"]);
  }
}
