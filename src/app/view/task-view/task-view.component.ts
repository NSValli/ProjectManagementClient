import { Component, OnInit,ViewChild, Input, HostListener } from '@angular/core';
import { SharedService } from 'src/app/service/shared.service';

import { Task } from 'src/app/model/task';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalPopupComponent } from 'src/app/view/modal-popup/modal-popup.component';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})

export class TaskViewComponent implements OnInit {
  @ViewChild(ModalPopupComponent,{static:false}) modalPopup: ModalPopupComponent;
  taskDetails: Task[];
  public searchTerm: string;
  selectedTask: any;

  showModal: boolean;
  content: string;
  title: string;
  sortType: string;

  constructor(private service: SharedService,
    private router: Router,
    private datePipe: DatePipe ) {
      this.service.GetAllTask().subscribe(
      (data) => this.taskDetails = data);
  }

  @Input('sortable-column')
  columnName: string;

  @Input('sort-direction')
  sortDirection: string = '';

  ngOnInit() {
  }

  editTask(id) {
    this.router.navigate(["taskedit"], { queryParams: { TaskID: id } });
  }

  endTask(id) {
    this.selectedTask = this.taskDetails.find(task => task.TaskId === id);
    this.selectedTask.EndDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.selectedTask.Status = 'Completed';


    this.service.UpdateTask(this.selectedTask.TaskId, this.selectedTask)
      .subscribe(
        data => {
          this.modalPopup.show();
          this.showModal = true; // Show Confirmation Box
          this.modalPopup.setContent("Task Has Been Ended Successfully.!" , "");
        },
        error => {
          this.modalPopup.setContent("Request Failed!" , "");
        });
  }

  public get sortedTaskArray(): Task[] {
      //alert("Hi");
      if (this.sortType === "desc") {
        this.sortType = "asc";
        return this.taskDetails.reverse();
      }
      else {
        this.sortType = "desc";
        return this.taskDetails.sort();
      }
    }
  @HostListener('click')
    sort() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
 }
