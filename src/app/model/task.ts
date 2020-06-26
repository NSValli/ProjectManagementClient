//import { NumberFormatStyle } from '@angular/common/src/i18n/locale_data_api';

export class Task {
    public TaskId:number;
    public TaskName:string;
    public ParentId:number;
    public ProjectId:number;
    public UserId:number;
    public Priority:number;
    public StartDate:Date;
    public EndDate:Date;
    public Status:string;
    public ParentTaskName: string;
    public ProjectName: string;
    public UserName: string;
}
