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

  constructor(private shared: SharedService, private router: Router) {
    this.getData();
  }

  getData() {
    this.shared.GetAllUser().subscribe(x => this.userList = x);
  }

  ngOnInit() {
  }

  btnEditUserClick(id) {
    this.router.navigate(["userUpdate"], { queryParams: { UserID: id } });
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

  public get sortedUserArray(): User[] {
    if (this.sortType === "desc") {
      this.sortType = "asc";
      return this.userList.reverse();
    }
    else {
      this.sortType = "desc";
      return this.userList.sort();
    }
  }

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

  }

}
