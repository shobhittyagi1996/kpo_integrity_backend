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
        if(sCountry=='KZ'){
        const username = 'sb-106b4ca3-a245-4582-9816-bbb95c02b246!b312694|it-rt-2b6bcf90trial!b55215';
        const password = '9c938808-b542-41e2-82db-3ff3688115b0$FE-2wQYK_4w2IAj-Px5yaB6FFrDH4t6Ql8CLL6b8xdg=';
        const basicAuth = 'Basic ' + btoa(username + ':' + password);
        let data = JSON.stringify({
            "tokenAuth" : "7rnszHzXvLf0Wu7ocHW4xrTJSEx3jc9",
            "iinBin" : "210540026044"
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
       let response = await  axios.request(config).catch((error) => {
                return req.error({ code: 417, message: error.message })
            });

        console.log(response)
        return JSON.stringify(response.data)
        }

        if(sCountry=='Foreign'){
            const username = 'sb-74c5428b-31f4-4f65-8b6e-43829ef73a9c!b313742|it-rt-434dc5dbtrial!b55215';
            const password = '35d0c559-9fcd-40d8-9f40-448cf87aeb24$kS8ADagsro4HYeGIkZu5yIwD3RsH5dYNHULoQXakm4U=';
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            let data = JSON.stringify({
                "apiKey"    : "9ec03844-96e3-4c78-9a90-a28be063f711",
                "apiSecret" : "ej+IR6UQ89s0QSz+G68yKr6UdJJFzVA8ySQUsR0GpKERRBTieqdsKmQF98GzMWtheQMOkGx4+iiskkqNSMqWvQ==",
                "iinBin"    : "7708004767"
            });
    
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://434dc5dbtrial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com/http/demo3',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': basicAuth
                },
                data: data
            };

            console.log(`axios is ready now hitting call`);
            let response = await  axios.request(config).catch((error) => {
                     return req.error({ code: 417, message: error.message })
                 });
     
             console.log(response)
             return JSON.stringify(response.data)
        }
    })


    srv.on("doGetRolesOfLoggedInUser",async (req) => {
        var requestAuthInfo = req.req.authInfo;
        securityScope.read = requestAuthInfo.checkLocalScope('Read');
        securityScope.write = requestAuthInfo.checkLocalScope('Create');
        securityScope.delete = requestAuthInfo.checkLocalScope('Delete');
        securityScope.update = requestAuthInfo.checkLocalScope('Update');
        return JSON.stringify(securityScope);

    })



}