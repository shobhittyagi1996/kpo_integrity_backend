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
