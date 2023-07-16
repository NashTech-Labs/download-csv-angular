import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

export interface Employee{
  "id": number;
  "employee_name": string;
  "employee_salary": number;
  "employee_age": number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'download-data';
  employeesList!: Employee[];
  columns: string[] = ['id', 'employee_name', 'employee_salary', 'employee_age'];

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe((response) => {
      this.employeesList = response;
    })
  }

  downloadTableData(){
    this.dataService.downloadFile(this.employeesList);
  }
}
