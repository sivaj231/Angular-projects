import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlConstantService {

  ROOT_URL: String = 'http://localhost:8080/KYCREST/'
  //ROOT_URL: String = 'http://rsgitstm48.ind.rsa-ins.com:8030/KYCREST/'
  //ROOT_URL: String = 'http://inmchn103:8030/KYCREST/'

  PRODUCTION_STATUS = 'UAT'

  LOGIN_URL: String = 'login'

  //User Related APIs
  GET_CHANNEL_BRANCH_LIST = 'api/getAllChannelAndBranchList';

  GET_USER_MAPPED_CHANNEL_BRANCH_LIST = 'api/getChannelLocationMappedForUser'
  
  SAVE_USER =  'api/saveUser';
  
  GET_MODULE_NAMES = 'api/getModuleNamesByRoleName';

  VIEW_USER = 'api/viewAllUsers';

  GET_USER_BY_ID = 'api/getUserById'

  GET_TELECALLERS_BY_CHANNEL_LOCATION = 'api/getTeleCallerBasedOnLocationChannel';

  CHECK_USERNAME = 'api/checkUserNameExistsOrNot';
  
  //Role Related APIs

  SAVE_ROLE = 'api/saveRole';

  VIEW_ROLE = 'api/viewRoles';
  
  VIEW_ROLE_BY_ID = 'api/viewRoleById';

  //Task Related APIs

  MY_TASK = 'api/myTask'

  POLICY_DETAILS = 'api/getPolicyDetails'

  TC_UPDATE = 'api/tcUpdates'

  GLOBAL_SEARCH = 'api/globalSearch'

  GET_TASK_DETAILS_FOR_REALLOCATION = 'api/getTaskDetailsByTelecallerForReallocation'

  REALLOCATE_TASK = 'api/reallocateTask'

  GET_TASK_DETAILS_FOR_TEMP = 'api/getTaskDetailsByTelecallerForTempAllocation'

  TEMPORARY_ALLOCATE = 'api/tempAllocateTask'

  GET_DISTINCT_DISPOSITION = 'api/getDistinctDisposition'

  GET_SUB_DISPOSITION =  'api/getDispositionBasedOnSubDisposition'



  //CALL RELATED APIs

  AGENT_LOGIN = 'api/clearTouchAgentLogin';

  TRIGGER_CALL_FUNCTION =  'api/triggerCallFunction';

  //Alternate Number Related APIs
  SEND_OTP = 'api/sendOtpVerification'
  
  VERIFY_OTP = 'api/verifyOtp';
  
  SEND_VERIFICATION_LINK = 'api/sendVerificationLink'

  //Exceptional Task Related APIs
  TRANSFER_TASK = 'api/taskTransfer'

  GET_EXCEPTIONAL_TASK = 'api/getExceptionalTask'

  ASSIGN_TO_ME = 'api/allocateExceptionalTask'

  ASSIGNED_TASK = 'api/viewExceptionalTask'

  GET_REMINDERS = 'api/getReminders'

  //Excel Uploads
  UPLOAD_MOBILE = 'api/mobileNumberUpload'

  VIEW_EXCEL_UPLOAD = 'api/viewExcelUploads'

  DOWNLOAD_EXCEL = 'api/downloadExcelFiles'

  DOWNLOAD_INVALID = 'api/downloadInvalidMobileNumber'

  DOWNLOAD_NC_MOBILE = 'api/downloadNcMobileNumber'
  
  DOWNLOAD_HEADER = 'api/downloadMobileExcelHeader';
  

  constructor() { }
}
