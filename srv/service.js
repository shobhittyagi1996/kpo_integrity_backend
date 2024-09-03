const axios = require("axios");
const textBundle = require("@sap/textbundle").TextBundle;
var bundle = new textBundle({
  path: "./_i18n/i18n.properties",
  locale: "en_EN",
});
module.exports = async (srv) => {
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
        return JSON.stringify(results);
      } else {
        return "something went wrong....";
      }
    }
  });

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
