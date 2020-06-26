import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
import { User } from 'src/app/model/user';
import { Task } from 'src/app/model/task';
import { SharedService } from './shared.service';

describe('SharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule,
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: SharedService = TestBed.get(SharedService);
    expect(service).toBeTruthy();
  });

  //Test cases for Projects
  it('should return Project records', () => {
    const service: SharedService = TestBed.get(SharedService);
    const list=service.GetAllProject()
    expect(list).toBeDefined();
  });
  it('should return ProjectByID records', () => {
    const service: SharedService = TestBed.get(SharedService);
    const list=service.GetProjectById(5)
    expect(list).toBeDefined();
  });
  //Test cases for Tasks
  it('should return Task records', () => {
    const service: SharedService = TestBed.get(SharedService);
    const list=service.GetAllTask()
    expect(list).toBeDefined();
  });
  it('should return TaskByID records', () => {
    const service: SharedService = TestBed.get(SharedService);
    const list=service.GetTask(3)
    expect(list).toBeDefined();
  });
  //Test records for Users
  it('should return User records', () => {
    const service: SharedService = TestBed.get(SharedService);
    const list=service.GetAllUser()
    expect(list).toBeDefined();
  });

  it('should return UserByID records', () => {
    const service: SharedService = TestBed.get(SharedService);
    const list=service.GetUser(2)
    expect(list).toBeDefined();
  });
});
