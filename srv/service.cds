using kpo_integrity_backend.db as edd from '../db/edd_schema';

service integrity_check_api @(requires : 'authenticated-user') {
    action doGetIntegrityCheckResults(sBIN : String, sCountry:String) returns String;
    action doGetRolesOfLoggedInUser() returns String;
    entity VendorEDDCheckT as select from edd.VendorEDDCheckT;
    entity EDDResponseT as select from edd.EDDResponseT;
    action doGetADATAPDFReport () returns LargeString;
    action doGetWorldCheckPDFReport ()  returns LargeString;
    action autoCheckVendorIntegrity (sBIN : String, sCountry:String) returns String;
}
