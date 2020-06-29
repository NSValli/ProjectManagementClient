import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {

  showModal: boolean = false;
  content: string = "";
  navView: string = "";
  constructor(private router: Router) { }

  ngOnInit() {
  }

  //Bootstrap Modal Close event For Information Popup
  hide() {
    this.showModal = false;
    if (this.navView === "User") {
      this.router.navigate(["userview"]);
    }
    if (this.navView === "Task") {
      this.router.navigate(["taskview"]);
    }
    if (this.navView === "Project") {
      this.router.navigate(["projectview"]);
    }
  }

  show() {
    this.showModal = true;
  }

  setContent(information: string, uiObject: string) {
    this.content = information;
    this.navView = uiObject
  }

}
