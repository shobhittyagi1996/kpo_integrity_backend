const axios = require("axios");
const textBundle = require("@sap/textbundle").TextBundle;
var bundle = new textBundle({
  path: "./_i18n/i18n.properties",
  locale: "en_EN",
});
const cloudSDK = require('@sap-cloud-sdk/core');

module.exports = async (srv) => {
  const workflow = await cds.connect.to("workflow");

  let securityScope = {
    read: false,
    write: false,
    delete: false,
    update: false,
  };

  srv.on("doGetIntegrityCheckResults", async (req) => {
    debugger;
    let sBIN = req.data.sBIN;
    let sCountry = req.data.sCountry;
    console.log(`got BIN Number ${sBIN}`);
    if (sCountry == "KZ") {
      let response = await _GetAdataResultfromAPI(sBIN);
      console.log(response);
      return JSON.stringify(response.data);
    }

    if (sCountry == "Foreign") {
      const username =
        "sb-5647c0cf-6082-44af-8293-8ccaf5c1d35d!b503226|it-rt-demo-integrations!b410603";
      const password =
        "3746a7a3-ee06-4400-941a-c877e578b459$ADsiOzldVr_OyYDF5OqytZFNX_zPH38N0bdAt-jIT1Y=";
      const basicAuth = "Basic " + btoa(username + ":" + password);
      let data = JSON.stringify({
        apiKey: "9ec03844-96e3-4c78-9a90-a28be063f711",
        apiSecret:
          "ej+IR6UQ89s0QSz+G68yKr6UdJJFzVA8ySQUsR0GpKERRBTieqdsKmQF98GzMWtheQMOkGx4+iiskkqNSMqWvQ==",
        iinBin: sBIN,
      });

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://demo-integrations.it-cpi026-rt.cfapps.eu10-002.hana.ondemand.com/http/dummy_screening_mapping_test",
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
        data: data,
      };

      console.log(`axios is ready now hitting call`);
      let response = await axios.request(config).catch((error) => {
        return req.error({ code: 417, message: error.message });
      });

      console.log(response);
      return JSON.stringify(response.data);
    }
  });

  srv.on("doGetADATAPDFReport", async (req) => {
    let sBIN = req.data.sBIN;

    console.log(`got BIN Number ${sBIN}`);

    const username =
      "sb-5647c0cf-6082-44af-8293-8ccaf5c1d35d!b503226|it-rt-demo-integrations!b410603";
    const password =
      "3746a7a3-ee06-4400-941a-c877e578b459$ADsiOzldVr_OyYDF5OqytZFNX_zPH38N0bdAt-jIT1Y=";
    const basicAuth = "Basic " + btoa(username + ":" + password);
    let data = JSON.stringify({
      tokenAuth: "7rnszHzXvLf0Wu7ocHW4xrTJSEx3jc9",
      iinBin: "220540014706",
    });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://demo-integrations.it-cpi026-rt.cfapps.eu10-002.hana.ondemand.com/http/adataPdfReport",
      headers: {
        "Content-Type": "application/json",
        Authorization: basicAuth,
      },
      data: data,
    };

    console.log(`axios is ready now hitting call`);
    let response = await axios.request(config).catch((error) => {
      return req.error({ code: 417, message: error.message });
    });

    console.log(response);
    return JSON.stringify(response.data);
  });
  srv.on("doGetWorldCheckPDFReport", async (req) => {
    let sBIN = req.data.sBIN;

    console.log(`got BIN Number ${sBIN}`);

    const username =
      "sb-5647c0cf-6082-44af-8293-8ccaf5c1d35d!b503226|it-rt-demo-integrations!b410603";
    const password =
      "3746a7a3-ee06-4400-941a-c877e578b459$ADsiOzldVr_OyYDF5OqytZFNX_zPH38N0bdAt-jIT1Y=";
    const basicAuth = "Basic " + btoa(username + ":" + password);
    let data = JSON.stringify({
      apiKey: "9ec03844-96e3-4c78-9a90-a28be063f711",
      apiSecret:
        "ej+IR6UQ89s0QSz+G68yKr6UdJJFzVA8ySQUsR0GpKERRBTieqdsKmQF98GzMWtheQMOkGx4+iiskkqNSMqWvQ==",
      caseId: "BTP770004772240807184432",
    });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://demo-integrations.it-cpi026-rt.cfapps.eu10-002.hana.ondemand.com/http/dummy_world_check_reports",
      headers: {
        "Content-Type": "application/json",
        Authorization: basicAuth,
      },
      data: data,
    };

    console.log(`axios is ready now hitting call`);
    let response = await axios.request(config).catch((error) => {
      return req.error({ code: 417, message: error.message });
    });

    console.log(response);
    return JSON.stringify(response.data);
  });
  srv.on("doGetRolesOfLoggedInUser", async (req) => {
    var requestAuthInfo = req.req.authInfo;
    securityScope.read = requestAuthInfo.checkLocalScope("Read");
    securityScope.write = requestAuthInfo.checkLocalScope("Create");
    securityScope.delete = requestAuthInfo.checkLocalScope("Delete");
    securityScope.update = requestAuthInfo.checkLocalScope("Update");
    return JSON.stringify(securityScope);
  });

  srv.on("autoCheckVendorIntegrity", async (req) => {
    let sBIN = req.data.sBIN;
    let sCountry = req.data.sCountry;
    console.log(`got BIN Number & Country ${sBIN}  : ${sCountry}`);
    if (sCountry == "KZ") {
      let response = await _GetAdataResultfromAPI(sBIN);
      if (response && response.data) {
        console.log(response.data);
        let results = processPayload(response.data);
         console.log(`start getting seperated results one by one.....`)

        let aPassedResults = results.falseKeys.map(function(sKey){
          let newKey = {
            "Questions": bundle?.getText(sKey) || `i18n Key not found for - ${sKey}`
          }
          
          return newKey;
        });  // where values is coming false

        console.log(`Passed...${aPassedResults}`);

        let aFailedResults = results.trueKeys.map(function(sKey){
          let newKey = {
            "Questions": bundle?.getText(sKey) || `i18n Key not found for - ${sKey}`
          }
          
          return newKey;
        });  // where values is coming true

        console.log(`Failed...${aFailedResults}`);

        let aNotFoundResults = results.emptyKeys.map(function(sKey){
          let newKey = {
            "Questions": bundle?.getText(sKey) || `i18n Key not found for - ${sKey}`
          }
          
          return newKey;
        }); // where result does not found from API

        console.log(`Not Found...${aNotFoundResults}`);




        let oPayloadForWorkflow = {
          "suppliername": "Demo workflow Company",
          "supplierbin": sBIN,
          "passed": aPassedResults,
          "failed": aFailedResults,
          "notfound": aNotFoundResults
      };
       let resultSpa = await triggerInterityCheckWorkflow(req,workflow,oPayloadForWorkflow);
       console.log(`workflow triggered!!!`);
       console.log(resultSpa);

        return JSON.stringify(results);
      } else {
        return "something went wrong....";
      }
    }
  });


  srv.on("triggerEDDNotification", async (req) => {
         let supplierEmail = req.data.supplierEmail;
          // Retrieve the destination configuration
          const emailDestination = await cloudSDK.getDestination('Email_notification_utility');
          console.log('Destination retrieved:', emailDestination);

          // Build the HTTP request configuration
          const emailRequestConfig = await cloudSDK.buildHttpRequest(emailDestination);
          console.log('Request configuration:', emailRequestConfig);

          emailRequestConfig.method = 'POST';
          emailRequestConfig.url = '/odata/v4/catalog/sendmail'; 
          emailRequestConfig.data = {
              to: supplierEmail,
              subject: `KPO Enhanced Due Diligence Questionnaire Submission Request`,
              supplierID: "SUP001"
          };

           // Make the request to send the email
           const emailContentResponse = await axios.request(emailRequestConfig).catch(function(error){
            return req.error({ code: 417, message: error.message });
           });
            
           return "Notification sent successfully.";

  })






  async function triggerInterityCheckWorkflow(request,workflow,payload){
    let spaPayload = {
      "definitionId": "eu10.development-and-test-kjejpj21.suppliermanagement.integrityScreening",
      "context": payload
  };

  const resultSpa = await workflow
            .post(`/workflow/rest/v1/workflow-instances`, spaPayload)
            .catch(function (error) {
                return request.error({ code: 417, message: error.message });
            });

  return resultSpa;

  }


  function processPayload(Payload) {
    const emptyKeys = [];
    const trueKeys = [];
    const falseKeys = [];

    function checkValues(obj, prefix = "") {
      for (const key in obj) {
        const value = obj[key];
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (value === null || value === "" || value === "null") {
          emptyKeys.push(fullKey);
        }

        if (value === "true" || value === true) {
          trueKeys.push(fullKey);
        }

        if (value == false || value == "false" || value == 0 || value == "0") {
          falseKeys.push(fullKey);
        }

        // Recursively process nested objects
        if (typeof value === "object" && value !== null) {
          checkValues(value, fullKey);
        }
      }
    }

    checkValues(Payload);

    return {
      emptyKeys,
      trueKeys,
      falseKeys,
    };
  }

  async function _GetAdataResultfromAPI(sBIN) {
    const username =
      "sb-5647c0cf-6082-44af-8293-8ccaf5c1d35d!b503226|it-rt-demo-integrations!b410603";
    const password =
      "3746a7a3-ee06-4400-941a-c877e578b459$ADsiOzldVr_OyYDF5OqytZFNX_zPH38N0bdAt-jIT1Y=";
    const basicAuth = "Basic " + btoa(username + ":" + password);
    let data = JSON.stringify({
      tokenAuth: "7rnszHzXvLf0Wu7ocHW4xrTJSEx3jc9",
      iinBin: sBIN,
    });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://demo-integrations.it-cpi026-rt.cfapps.eu10-002.hana.ondemand.com/http/merged_api",
      headers: {
        "Content-Type": "application/json",
        Authorization: basicAuth,
      },
      data: data,
    };

    console.log(`axios is ready now hitting call`);
    let response = await axios.request(config).catch((error) => {
      return req.error({ code: 417, message: error.message });
    });

    return response;
  }





};
