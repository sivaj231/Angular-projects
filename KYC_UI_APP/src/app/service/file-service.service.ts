import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiUrlConstantService } from './api-url-constant.service';
import { catchError } from 'rxjs/internal/operators';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {
  

  constructor(
    private http: HttpClient,
    private apiUrl: ApiUrlConstantService
  ) { }


  uploadFiles(formData): Observable<any> {
    return this.http.post<any>(this.apiUrl.ROOT_URL.concat(this.apiUrl.UPLOAD_MOBILE.toString()), formData, { reportProgress: true, observe: 'events', }).pipe(catchError(this.errorMgmt))
  }

  searchFileUploadData(batchNumber, startDate, endDate, searchType): Observable<any> {
    return this.http.post<any>(this.apiUrl.ROOT_URL.concat(this.apiUrl.VIEW_EXCEL_UPLOAD.toString() + '?batchNumber=' + batchNumber + '&startDate=' + startDate + '&endDate=' + endDate + '&searchType=' + searchType), httpOptions);
  }

  public async downloadExcelFile(fileType: any, id: any): Promise<Blob> {
    const file = await this.http.get<Blob>(this.apiUrl.ROOT_URL.concat(this.apiUrl.DOWNLOAD_EXCEL.toString() + '?fileType=' + fileType + '&id=' + id), { responseType: 'blob' as 'json' }).toPromise();
    return file;
  }



  public async downloadInvalidExcelFile(startDate, endDate): Promise<Blob> {
    const file = await this.http.get<Blob>(this.apiUrl.ROOT_URL.concat(this.apiUrl.DOWNLOAD_INVALID.toString() + '?startDate=' + startDate + '&endDate=' + endDate), { responseType: 'blob' as 'json' }).toPromise();
    return file;
  }

  public async downloadNcExcelFile(startDate, endDate): Promise<Blob> {
    const file = await this.http.get<Blob>(this.apiUrl.ROOT_URL.concat(this.apiUrl.DOWNLOAD_NC_MOBILE.toString() + '?startDate=' + startDate + '&endDate=' + endDate), { responseType: 'blob' as 'json' }).toPromise();
    return file;
  }

  public async downloadHeaderFileExcelFile(): Promise<Blob> {
    const file = await this.http.get<Blob>(this.apiUrl.ROOT_URL.concat(this.apiUrl.DOWNLOAD_HEADER.toString()), { responseType: 'blob' as 'json' }).toPromise();
    return file;
  }


  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
