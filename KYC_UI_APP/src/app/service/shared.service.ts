import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private data = new BehaviorSubject(null);
  sharedData = this.data.asObservable();
  constructor() {
  
  }
  nextSharedData(data: any) {
    this.data.next(data);
  }

  getUserDataInfo() {
    return this.sharedData;
  }

}
