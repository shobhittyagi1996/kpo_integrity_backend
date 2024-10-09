using kpo_integrity_backend.db as edd from '../db/edd_schema';

service integrity_check_api @(requires: 'authenticated-user') {
    entity VendorDetailsT                            as select from edd.VendorDetailsT;
    entity IntegrityCheckT                           as select from edd.IntegrityCheckT;
    entity EDDCheckT                                 as select from edd.EDDCheckT;
    entity supplierShareHolderDetailsT as select from edd.supplierShareHolderDetailsT;
    action doGetIntegrityCheckResults(sBIN : String, sCountry : String) returns String;
    action doGetRolesOfLoggedInUser()                                   returns String;
    action doGetADATAPDFReport()                                        returns LargeString;
    action doGetWorldCheckPDFReport()                                   returns LargeString;
    action autoCheckVendorIntegrity(sBIN : String, sCountry : String)   returns String;
    action triggerEDDNotification(supplierEmail : String)               returns String;

}
