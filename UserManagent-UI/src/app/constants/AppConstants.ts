export class AppConstants {

    //LOCAL
    public static get baseURL(): string { return "http://localhost:1010/"; }

    //RS - UAT
    // public static get baseURL(): string { return "https://www.royalsundaram.net/user_mgmt/"; }

    //FA UAT
    // public static get baseURL(): string { return "http://192.168.100.10:9090/user_mgmt/"; }

    //RS-LIVE
    // public static get baseURL(): string { return "http://10.46.195.195:7171/user_mgmt/"; }

    public static get SUCCESS(): string { return "SUCCESS" };

    public static get APPLICATION_NAME_AND_ROLE_NAME_ALREADY_EXISTS(): string { return "APPLICATION NAME AND ROLE NAME ALREADY EXISTS"};

    public static get FAILURE(): string { return "FAILURE" };

    public static get NEW(): string { return "NEW"; }

    public static get EDIT(): string { return "EDIT"; }

    public static get MANAGER(): string { return "MANAGER"; }

    public static get ADMIN(): string { return "ADMIN"; }

    public static get USER(): string { return "USER"; }

    public static get IT_SUPPORT(): string { return "IT SUPPORT"; }

    public static get AUTHENTICATE(): string { return this.baseURL + "authenticate"; }

    public static get LOGOUT(): string { return this.baseURL + "logout"; }

    public static get SAVE_BRANCH(): string { return this.baseURL + "saveApplicationMaster"; }

    public static get GET_ALL_BRANCH(): string { return this.baseURL + "getAllBranch"; }

    public static get SAVE_EMPLOYEE(): string { return this.baseURL + "saveEmployeeMaster"; }

    public static get GET_ALL_EMPLOYEE(): string { return this.baseURL + "getAllEmployee"; }

    public static get SAVE_DEPARTMENT(): string { return this.baseURL + "saveDepartmentDetails"; }

    public static get GET_ALL_DEPARTMENT(): string { return this.baseURL + "viewDepartmentDetails"; }

    public static get GET_ALL_APPLICATION(): string { return this.baseURL + "getAllApplication"; }

    public static get GET_ALL_APPLICATION_AND_EMPLOYEE(): string { return this.baseURL + "getAllApplicationandEmployee";}

    public static get SAVE_APPLICATION_DETAILS(): string { return this.baseURL + "saveApplicationDetails"; }

    public static get GET_ALL_USER(): string { return this.baseURL + "getAllUser"; }

    public static get SAVE_USER(): string { return this.baseURL + "saveUserMaster"; }

    public static get GET_ALL_ITSUPPORT(): string { return this.baseURL + "getAllITSupport"; }

    public static get SAVE_ITSUPPORT(): string { return this.baseURL + "saveITSupportMaster"; }

    public static get SAVE_ROLE(): string { return this.baseURL + "roleManagement"; }

    public static get GET_ALL_ROLE(): string { return this.baseURL + "getAllRoles"; }

    public static get SAVE_DESIGNATION(): string { return this.baseURL + "saveDesignationMaster"; }

    public static get GET_ALL_DESIGNATION(): string { return this.baseURL + "getAllDesignation"; }

    public static get SAVE_APP_OWNER(): string { return this.baseURL + "saveApplicationOwnerMaster"; }

    public static get GET_ALL_APPOWNER(): string { return this.baseURL + "getAllAppOwner"; }

    public static get SAVE_APP_ROLE_MAPPING(): string { return this.baseURL + "saveApplicationRoleMapping"; }

    public static get FIND_EXIST_APP_ROLE_MAPPING(): string { return this.baseURL + "existApplicationRoleMapping"; }

    public static get GET_ALL_IT_ASSET(): string { return this.baseURL + "getAllAsset"; }

    public static get GET_ALL_EMP_ASSET_DETAILS(): string { return this.baseURL + "saveApplicationRoleMapping"; }

    public static get SAVE_ASSET_MASTER(): string { return this.baseURL + "saveAssetMaster"; }

    public static get GET_ALL_ASSET_MASTER(): string { return this.baseURL + "getAllAsset"; }

    public static get GET_SEARCH_ASSET_MASTER(): string { return this.baseURL + "getSearchAsset"; }

    public static get GET_EMP_BY_ID(): string { return this.baseURL + "getEmployeeById"; }

    public static get GET_ASSET_DETAILS_BY_ID(): string { return this.baseURL + "getAssetDetailsById"; }

    public static get GET_ALL_IT_ASSET_DETAILS(): string { return this.baseURL + "getAllITAsset"; }

    public static get GET_MAPPED_APPLICATION_LIST(): string { return this.baseURL + "getAllApplicationRole"; }

    public static get GET_APPCODE_AND_ROLE_CODE(): string { return this.baseURL + "getAppCodeAndRoleCode"; }

    public static get SAVE_IT_ASSET_DETAILS(): string { return this.baseURL + "saveAssetDetails"; }

    public static get SEARCH_EMPLOYEE(): string { return this.baseURL + "searchEmployee"; }

    public static get SEARCH_USER(): string { return this.baseURL + "searchUser"; }

    public static get GET_DASHBOARD_COUNT(): string { return this.baseURL + "getEmployeeCount"; }

    public static get GET_RECENT_EMPLOYEE_DETAILS(): string { return this.baseURL + "getRecentEmployeeDetails"; }

    public static get GET_DEPARTMENT_COUNT_CHART(): string { return this.baseURL + "getDepartmentCountChart"; }

    public static get SEARCH_BRANCH(): string { return this.baseURL + "searchBranch"; }

    public static get SEARCH_DEPARTMENT(): string { return this.baseURL + "searchDepartment"; }

    public static get SEARCH_DESIGNATION(): string { return this.baseURL + "searchDesignation"; }

    public static get SEARCH_APP_MASTER(): string { return this.baseURL + "searchApplication"; }

    public static get SEARCH_APP_OWNER(): string { return this.baseURL + "searchAppOwner"; }

    public static get SEARCH_APP_ROLE(): string { return this.baseURL + "searchAppRole"; }

    public static get SEARCH_IT_SUPPORT(): string { return this.baseURL + "searchITSupport"; }

    public static get SEARCH_ROLE(): string { return this.baseURL + "searchRole"; }

    public static get SEARCH_IT_ASSET(): string { return this.baseURL + "searchItAsset"; }

    public static get UPDATE_APP_DATA_MAINTENANCE(): string { return this.baseURL + "updateAppDataMaintenance"; }

    public static get SAVE_IT_ASSET_MAP(): string { return this.baseURL + "saveITAssetMappingMaster"; }

    public static get GET_ALL_IT_ASSET_MAP(): string { return this.baseURL + "getAllITAssetMap"; }

    public static get GET_ALL_ITASSET_BY_ASSETTYPE(): string { return this.baseURL + "getAllITAssetbyAssetType"; }

    public static get GET_ASSET_DETAILS_BY_ASSET_ID(): string { return this.baseURL + "getAssetDetailsByAssetId"; }

    public static get GET_ALL_EMPLOYEE_BY_REPORTING_HEAD(): string { return this.baseURL + "getAllEmployeeByReportingHead"; }

    public static get SAVE_APP_DATA_MAITENANCE(): string { return this.baseURL + "saveAppDataMaitenance"; }

    public static get SAVE_COMPANY_POLICY(): string { return this.baseURL + "saveCompanyPolicy"; }

    public static get GET_COMPANY_POLICY(): string { return this.baseURL + "getCompanyPolicy"; }

    public static get POLICY_ACCEPTENCE(): string { return this.baseURL + "policyAcceptence"; }

    public static get GET_MANAGER_DASHBOARD_COUNT(): string { return this.baseURL + "getManagerDashBoardCount"; }

    public static get SAVE_COMMON_DRIVE(): string { return this.baseURL + "saveCommonDrive"; }

    public static get GET_ALL_COMMON_DRIVE(): string { return this.baseURL + "getAllCommonDrive"; }

    public static get GET_USERS_BY_ROLE(): string { return this.baseURL + "getUsersByRole"; }

    public static get GET_APPLICATION_GROUP_BY(): string { return this.baseURL + "getApplicationGroupBy"; }

    public static get GET_CURRENT_EMPLOYEE_DETAILS(): string { return this.baseURL + "getCurrentEmployeeDetails"; }

    public static get MAP_EMP_APPLICATION_AND_ROLES(): string { return this.baseURL + "mapEmpApplicationAndRoles"; }

    public static get MAP_DRIVE_TO_EMP(): string { return this.baseURL + "mapCommonDriveToEmp"; }

    public static get GET_COMMON_DRIVE_MAPPING_DETAILS(): string { return this.baseURL + "getCommonDriveMappingDetails"; }

    public static get GET_ALL_REPORTS_DASHBOARD(): string { return this.baseURL + "getAllReportsDashboard"; }

    public static get SAVE_REPORTS_MAPPING(): string { return this.baseURL + "saveReportsMapping"; }

    public static get GET_EMP_REPORTS_DASHBOARD_MAPPING_DETAILS(): string { return this.baseURL + "getEmpReportsDashboardMappingDetails"; }

    public static get GET_APPLICATION_DATA_CURRENT_QUARTER(): string { return this.baseURL + "getApplicationDataCurrentQuarter"; }
    

    public static get SAVE_AUP_POLICY(): string { return this.baseURL + "aupPolicySave" }

    public static get SAVE_COMPLIANCE(): string { return this.baseURL + "complianceSave" }

    public static get GET_ALL_COMPLIANCE(): string { return this.baseURL + "getAllCompliance"; }

    public static get GET_ALL_COMPLIANCE_TYPE_ACTIVE(): string { return this.baseURL + "getAllComplianceTypeActive"; }

    public static get GET_COMPLIANCE_BY_ID(): string { return this.baseURL + "getComplianceById"; }

    public static get SEARCH_COMPLIANCE(): string { return this.baseURL + "searchCompliance"; }

    public static get SAVE_COMPLIANCES(): string { return this.baseURL + "compliancesSave" }

    public static get GET_ALL_COMPLIANCES(): string { return this.baseURL + "getAllCompliances"; }

    public static get GET_COMPLIANCES_BY_ID(): string { return this.baseURL + "getCompliancesById"; }

    public static get GET_COMPLIANCES_VIEW_FILE(): string { return this.baseURL + "getCompliancesViewFile"; }

    public static get SEARCH_COMPLIANCES(): string { return this.baseURL + "searchCompliances"; }

    public static get SAVE_ACCEPT_POLICY(): string { return this.baseURL + "savePolicyAccept" }

    public static get GET_NOT_ACCEPT_POLICY(): string { return this.baseURL + "notPolicyAccept" }

    public static get GET_NOT_ACCEPT_POLICY_COUNT(): string { return this.baseURL + "policyCount" }

    public static get GET_ACCEPT_POLICY_STATUS(): string { return this.baseURL + "policyStatus" }

    public static get SEARCH_ACCEPT_USER_POLICY(): string { return this.baseURL + "searchAcceptUserPolicy"; }

    public static get GET_ALL_EMP(): string { return this.baseURL + "getAllEmployee"; }

    public static get GET_COMMONDRIVE_PATH(): string { return this.baseURL + "getCommonDriveByPath"; }


}