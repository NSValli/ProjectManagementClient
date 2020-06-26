import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/service/shared.service';
import { first } from 'rxjs/internal/operators/first';

import { ModalPopupComponent } from 'src/app/view/modal-popup/modal-popup.component';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  @ViewChild(ModalPopupComponent,{static:false}) modalPopup: ModalPopupComponent;

  UserAddForm: FormGroup;
  submitted: boolean = false;
  showModal: boolean;

  constructor(private shared: SharedService,
    private router: Router,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.UserAddForm = this.formbuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmployeeID: ['', Validators.required]
    });
  }

  get f() { return this.UserAddForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.UserAddForm.invalid) {
      return;
    }

    this.shared.AddUser(this.UserAddForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.modalPopup.show();
          this.showModal = true;
          this.modalPopup.setContent("New User Has Been Added Successfully", "User");
        },
        error => {
          this.showModal = true; // Show Confirmation Box
          this.modalPopup.setContent("Request Failed", "");
        });
  }

  ResetUserDetails() {
    this.UserAddForm = this.formbuilder.group({
      FirstName: null,
      LastName: null,
      EmployeeID: null
    });
  }
}
