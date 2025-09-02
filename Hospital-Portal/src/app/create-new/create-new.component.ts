import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.css']
})
export class CreateNewComponent implements OnInit {

  constructor() { }
  files: any = [];

  uploadFile(event,value) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }  
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
  show:boolean=true; 
  showIndDocsdetails(){
    this.show=!this.show;    
  }
  ngOnInit() {    
      $("#accordion").on("hide.bs.collapse show.bs.collapse", e => {
        $(e.target)
          .prev()
          .find("i:last-child")
          .toggleClass("fa-minus fa-plus");
      });    
  }
  appendDocs=[1];
  addDocument() {
    this.appendDocs.push(this.appendDocs.length);
  }
}
