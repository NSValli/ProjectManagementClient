import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
//import { pipe } from '@angular/core/src/render3/pipe';

import { ModalPopupComponent } from 'src/app/view/modal-popup/modal-popup.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  @ViewChild(ModalPopupComponent , {static:false}) modalPopup: ModalPopupComponent;

  userList: User[];
  public searchTerm: string;

  showModal: boolean;
  content: string;
  title: string;
  sortType: string;
  sortDirection: string;
  attribute: string;

  constructor(private shared: SharedService, private router: Router) {
    this.getData();
  }

  getData() {
    this.shared.GetAllUser().subscribe(x => this.userList = x);
  }

  ngOnInit() {
  }

  btnEditUserClick(id) {
    this.router.navigate(["useredit"], { queryParams: { UserID: id } });
  }

  btnDeleteUserClick(id) {
    this.shared.DeleteUser(id).subscribe(
      data => {
        this.modalPopup.show();
        this.showModal = true;
        this.modalPopup.setContent("User Has Been Deleted Successfully", "User");
        this.getData();
      },
      error => {
        this.showModal = true;
        this.modalPopup.setContent("Deletion Failed", "");
      });
  }


  public sortfn(att) {
    this.attribute = att;
    this.userList = this.sortedUserArray();
  }
  
  public sortedUserArray(): User[] {
    //alert("Hi");
    if(this.userList == null || this.userList.length <= 0) {
      console.log("User list is empty");
    //  alert(this.attribute);
      return;
    }
    if (this.sortType === "desc") {
      this.sortType = "asc";
      if(this.attribute === "uid") {
        return this.userList.sort((a,b) => b.UserID - a.UserID);
      }
      if(this.attribute === "id") {
        return this.userList.sort((a,b) => b.EmployeeID.localeCompare(a.EmployeeID));
      }
      if(this.attribute === "first") {
        return this.userList.sort((a,b) => b.FirstName.localeCompare(a.FirstName));
      }
      if(this.attribute === "last") {
        return this.userList.sort((a,b) => b.LastName.localeCompare(a.LastName));
      }
    }
    else {
      this.sortType = "desc";
      if(this.attribute === "uid") {
        return this.userList.sort((a,b) => a.UserID-b.UserID);
      }
      if(this.attribute === "id") {
        return this.userList.sort((a,b) => a.EmployeeID.localeCompare(b.EmployeeID));
      }
      if(this.attribute === "first") {
        return this.userList.sort((a,b) => a.FirstName.localeCompare(b.FirstName));
      }
      if(this.attribute === "last") {
        return this.userList.sort((a,b) => a.LastName.localeCompare(b.LastName));
      }
    }
  }

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

  }

}
