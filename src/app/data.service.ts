import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = '/assets/tableData.json';

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  downloadFile(data: any) {
    const replacer = (key: any, value: null) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob(["\uFEFF"+csvArray], {type: 'text/csv;charset=utf-8' })
    saveAs(blob, "dataFile.csv");
  }
}
