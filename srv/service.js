const axios = require("axios")

module.exports = async srv => {
    let securityScope = {
        "read": false,
        "write": false,
        "delete": false,
        "update": false
    };

    srv.on("doGetIntegrityCheckResults", async (req) => {
        let sBIN = req.data.sBIN
        let sCountry = req.data.sCountry;
        console.log(`got BIN Number ${sBIN}`);
        if (sCountry == 'KZ') {
            const username = 'sb-106b4ca3-a245-4582-9816-bbb95c02b246!b312694|it-rt-2b6bcf90trial!b55215';
            const password = '9c938808-b542-41e2-82db-3ff3688115b0$FE-2wQYK_4w2IAj-Px5yaB6FFrDH4t6Ql8CLL6b8xdg=';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            let data = JSON.stringify({
                "tokenAuth": "7rnszHzXvLf0Wu7ocHW4xrTJSEx3jc9",
                "iinBin": sBIN
            });


            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://2b6bcf90trial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com/http/test_edd',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': basicAuth
                },
                data: data
            };

            console.log(`axios is ready now hitting call`);
            let response = await axios.request(config).catch((error) => {
                return req.error({ code: 417, message: error.message })
            });

            console.log(response)
            return JSON.stringify(response.data)
        }

        if (sCountry == 'Foreign') {
            const username = 'sb-106b4ca3-a245-4582-9816-bbb95c02b246!b312694|it-rt-2b6bcf90trial!b55215';
            const password = '9c938808-b542-41e2-82db-3ff3688115b0$FE-2wQYK_4w2IAj-Px5yaB6FFrDH4t6Ql8CLL6b8xdg=';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            let data = JSON.stringify({
                "apiKey": "9ec03844-96e3-4c78-9a90-a28be063f711",
                "apiSecret": "ej+IR6UQ89s0QSz+G68yKr6UdJJFzVA8ySQUsR0GpKERRBTieqdsKmQF98GzMWtheQMOkGx4+iiskkqNSMqWvQ==",
                "iinBin": sBIN
            });

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://2b6bcf90trial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com/http/dummy_screening_mapping_test',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': basicAuth
                },
                data: data
            };

            console.log(`axios is ready now hitting call`);
            let response = await axios.request(config).catch((error) => {
                return req.error({ code: 417, message: error.message })
            });

            console.log(response)
            return JSON.stringify(response.data)
        }
    })

    srv.on("doGetADATAPDFReport", async (req) => {
        let sBIN = req.data.sBIN;

        console.log(`got BIN Number ${sBIN}`);

        const username = 'sb-106b4ca3-a245-4582-9816-bbb95c02b246!b312694|it-rt-2b6bcf90trial!b55215';
        const password = '9c938808-b542-41e2-82db-3ff3688115b0$FE-2wQYK_4w2IAj-Px5yaB6FFrDH4t6Ql8CLL6b8xdg=';
        const basicAuth = 'Basic ' + btoa(username + ':' + password);
        let data = JSON.stringify({
            "tokenAuth": "7rnszHzXvLf0Wu7ocHW4xrTJSEx3jc9",
            "iinBin": "220540014706"
        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://2b6bcf90trial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com/http/adataPdfReport',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            },
            data: data
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

        const username = 'sb-106b4ca3-a245-4582-9816-bbb95c02b246!b312694|it-rt-2b6bcf90trial!b55215';
        const password = '9c938808-b542-41e2-82db-3ff3688115b0$FE-2wQYK_4w2IAj-Px5yaB6FFrDH4t6Ql8CLL6b8xdg=';
        const basicAuth = 'Basic ' + btoa(username + ':' + password);
        let data = JSON.stringify({
            "apiKey": "9ec03844-96e3-4c78-9a90-a28be063f711",
            "apiSecret": "ej+IR6UQ89s0QSz+G68yKr6UdJJFzVA8ySQUsR0GpKERRBTieqdsKmQF98GzMWtheQMOkGx4+iiskkqNSMqWvQ==",
            "iinBin": "7708004767",
            "caseId": "BTP770004772240807184432"
        });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://2b6bcf90trial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com/http/dummy_world_check_reports',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            },
            data: data
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
        securityScope.read = requestAuthInfo.checkLocalScope('Read');
        securityScope.write = requestAuthInfo.checkLocalScope('Create');
        securityScope.delete = requestAuthInfo.checkLocalScope('Delete');
        securityScope.update = requestAuthInfo.checkLocalScope('Update');
        return JSON.stringify(securityScope);

    })



}