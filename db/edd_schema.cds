namespace kpo_integrity_backend.db;

using {
  cuid,
  managed
} from '@sap/cds/common';


entity VendorEDDCheckT : cuid, managed {

  supplierBIN         : String;
  supplierName        : String;
  supplierAddress     : String;
  supplierCountry     : String;
  eddStatus           : String;
  integrityStatus     : String;
  surnameVerifyStatus : String;
  apiResponseStore    : LargeString;
  lastUpdated         : DateTime;
}

entity EDDResponseT : cuid, managed {
  supplierBIN         : String;
  supplierName        : String;
  eddTitle            : String;
  question1_response  : Boolean;
  question1_res_desc  : String;
  question2_response  : Boolean;
  question2_res_desc  : String;
  question3_response  : Boolean;
  question3_res_desc  : String;
  question4_response  : Boolean;
  question4_res_desc  : String;
  question5_response  : Boolean;
  question5_res_desc  : String;
  question6_response  : Boolean;
  question6_res_desc  : String;
  question7_response  : Boolean;
  question7_res_desc  : String;
  question8_response  : Boolean;
  question8_res_desc  : String;
  question9_response  : Boolean;
  question9_res_desc  : String;
  question10_response : Boolean;
  question10_res_desc : String;
  question11_response : Boolean;
  question11_res_desc : String;
  question12_response : Boolean;
  question12_res_desc : String;
  question13_response : Boolean;
  question13_res_desc : String;
  question14_response : Boolean;
  question14_res_desc : String;
  question15_response : Boolean;
  question15_res_desc : String;
  question16_response : Boolean;
  question16_res_desc : String;
  question17_response : Boolean;
  question17_res_desc : String;
  question18_response : Boolean;
  question18_res_desc : String;
  question19_response : Boolean;
  question19_res_desc : String;
  question20_response : Boolean;
  question20_res_desc : String;
  question21_response : Boolean;
  question21_res_desc : String;
  question22_response : Boolean;
  question22_res_desc : String;
  question23_response : Boolean;
  question23_res_desc : String;
}
