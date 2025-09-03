import { Component, OnInit } from '@angular/core';
import { itAssetMappingService } from '../../services/itassetmappingservice';
import { assetMaster } from '../../services/assetMaster';

@Component({
  selector: 'app-it-support-dashboard',
  templateUrl: './it-support-dashboard.component.html',
  styleUrls: ['./it-support-dashboard.component.scss']
})
export class ItSupportDashboardComponent implements OnInit {

  assetMasterList: any[] = [];

  assetMasterMappingList: any[] = [];

  constructor(private assetMaster: assetMaster, private itAssetMappingService: itAssetMappingService) { }

  ngOnInit(): void {

    this.getAllAssetMaster();
    this.getAllITAssetMap();

  }

  getAllAssetMaster() {

    this.assetMaster.getAllAsset().subscribe(data => {

      this.assetMasterList = data['responseDto'];

    })

  }

  getAllITAssetMap() {

    this.itAssetMappingService.getAllITAssetMap().subscribe(data => {

      this.assetMasterMappingList = data['responseDto'];

    })

  }
}
