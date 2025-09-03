import { AppConstants } from './../constants/AppConstants';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ReportDashboardService {

    constructor(private httpClient: HttpClient) {

    }

    getAllReportsDashboard() {

        return this.httpClient.post(AppConstants.GET_ALL_REPORTS_DASHBOARD, '');

    }

    saveReportsDashboard(req) {

        return this.httpClient.post(AppConstants.SAVE_REPORTS_MAPPING, req);

    }

    getEmpReportsDashboard(req) {

        return this.httpClient.post(AppConstants.GET_EMP_REPORTS_DASHBOARD_MAPPING_DETAILS, req);

    }

}