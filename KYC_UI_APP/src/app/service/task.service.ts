import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ApiUrlConstantService } from './api-url-constant.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {



  constructor(
    private http: HttpClient,
    private apiUrl: ApiUrlConstantService
  ) { }



  myTask(transactionType): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.MY_TASK.toString() + '?transactionType=' + transactionType), httpOptions);
  }

  policyDetails(taskId, businessType): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.POLICY_DETAILS.toString() + '?taskId=' + taskId + '&businessType=' + businessType), httpOptions);
  }

  callFunction(taskId, mobileNumber): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.TRIGGER_CALL_FUNCTION.toString() + '?taskId=' + taskId + '&mobileNum=' + mobileNumber), httpOptions);
  }

  tcUpdates(tcUpdateDto): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.TC_UPDATE.toString()), tcUpdateDto, httpOptions);
  }

  globalSearch(searchType, searchValue, year): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GLOBAL_SEARCH.toString() + '?searchType=' + searchType + '&searchValue=' + searchValue + '&year=' + year), httpOptions);
  }

  sendOtp(taskId, mobileNum, requestType): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.SEND_OTP.toString() + '?taskId=' + taskId + '&mobileNumber=' + mobileNum + '&requestType=' + requestType), httpOptions);
  }

  verifyOtp(taskId, otp, requestType): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.VERIFY_OTP.toString() + '?taskId=' + taskId + '&otp=' + otp + '&requestType=' + requestType), httpOptions);
  }

  sendVerification(taskId, alternateNumber, requestType): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.SEND_VERIFICATION_LINK.toString() + '?taskId=' + taskId + '&alternateNumber=' + alternateNumber+ '&requestType=' + requestType), httpOptions);
  }

  getExceptionalTask(): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_EXCEPTIONAL_TASK.toString()), httpOptions);
  }

  transferTask(taskId, reason): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.TRANSFER_TASK.toString() + '?taskId=' + taskId + '&reason=' + reason), httpOptions);
  }

  exceptionTaskManagement(exceptionTaskReqDto): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.ASSIGN_TO_ME.toString()), exceptionTaskReqDto, httpOptions);
  }

  getExceptionAssignedTask(): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.ASSIGNED_TASK.toString()), httpOptions);
  }

  getReminders(): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_REMINDERS.toString()), httpOptions);
  }

  getTaksForreallocateTask(taskModificationDto): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_TASK_DETAILS_FOR_REALLOCATION.toString()), taskModificationDto, httpOptions);
  }

  reallocateTask(reqData): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.REALLOCATE_TASK.toString() + '?rellocateDetails=' + reqData), httpOptions);
  }

  getTaksFortempAllocation(taskModificationDto): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_TASK_DETAILS_FOR_TEMP.toString()), taskModificationDto, httpOptions);
  }

  temporaryAllocation(reqData): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.TEMPORARY_ALLOCATE.toString() + '?tempDetails=' + reqData), httpOptions);
  }

  agentLogin(): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.AGENT_LOGIN.toString()), httpOptions);
  }

  getDisposition(): Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_DISTINCT_DISPOSITION.toString()), httpOptions);
  }

  getSubDisposition(disposition: any) :Observable<any> {
    return this.http.post(this.apiUrl.ROOT_URL.concat(this.apiUrl.GET_SUB_DISPOSITION.toString() + '?dispositionName=' + disposition), httpOptions);
  }


}
