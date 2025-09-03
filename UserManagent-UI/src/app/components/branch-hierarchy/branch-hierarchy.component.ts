import { Component, OnInit } from '@angular/core';

declare var LeaderLine: any;

@Component({
  selector: 'app-branch-hierarchy',
  templateUrl: './branch-hierarchy.component.html',
  styleUrls: ['./branch-hierarchy.component.scss']
})
export class BranchHierarchyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    new LeaderLine(
      document.getElementById('ex-010-0'),
      document.getElementById('ex-010-1'),
      { dash: { animation: true }, size: 2, color: '#26639f', }
    );



  }


  makeLine(selectedItem) {

    let line = new LeaderLine(
      document.getElementById(selectedItem),
      document.getElementById('city_box'),
      { dash: { animation: true }, size: 2, color: '#26639f', }
    );

    //line.remove();

  }


}
