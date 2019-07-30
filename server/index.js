const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const keccak256 = require('js-sha3').keccak256;
const mongoose = require('mongoose')
const CircularJSON = require('circular-json')
const axios = require('axios')
////////////////////////////////////////////////
/* const { Api, JsonRpc, RpcError } = require('eosjs');
const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;  // development only
const fetch = require('node-fetch');                            // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');

const defaultPrivateKey = "5KKodHxhrpZQhWeVTAzBJgfwGwPjkYAZdtWiWX9jaZTDL7utgKo";
const seckey = "5KeNdWYxPbUpsLUa8QT64AbjTAQeHcZejcR6shHnNi1sESgxgm7";
const thkey = "5KPfBkx5wTPWcKTJbWsgZhcSw48gQEG8hHmUw5RTGwE5xs3WQ2h";
const fkey = "5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo";
const sixkey = "5KdhJsjnyg1ztjdMUi1VjEVz8KNJZpEhfMRXX2wFV1bCVbcziPP"

const signatureProvider = new JsSignatureProvider([defaultPrivateKey, seckey, thkey, fkey, sixkey]); */

//const httpEndpoint = 'https://jungle2.cryptolions.io';
const httpEndpoint = 'https://kylin-dsp-2.liquidapps.io';
/* const rpc = new JsonRpc(httpEndpoint, { fetch })
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); */
const eosjs2 = require('../eosjs2/eosaction');
const Api = eosjs2.API
const JsSignatureProvider = eosjs2.JsSignatureProvider
const JsonRpc = eosjs2.JsonRpc
//const { JsonRpc, JsSignatureProvider, Api } = eosjs2;
const ecc = require('eosjs-ecc')
const { BigNumber } = require('bignumber.js');
const Eos = require('eosjs');
//console.log(Eos)
const delay = ms => new Promise(res => setTimeout(res, ms));
const delaySec = sec => delay(sec * 1000);
const fetch = require('node-fetch');
let { PrivateKey, PublicKey, Signature, Aes, key_utils, config } = require('eosjs-ecc')
var endpoint = httpEndpoint;

////////////////////////////////////////////////
let app = express()
// app.server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());
console.log("WELCOME!!")

app.get('/', (req, res) => {
    res.status(200).send("Moonlight APi")
})

const url = httpEndpoint;
const toBound = (numStr, bytes) =>
    `${(new Array(bytes * 2 + 1).join('0') + numStr).substring(numStr.length).toUpperCase()}`;

const rpc = new JsonRpc(url, { fetch });

app.post('/test', async (req, res) => {


    let privateWif
    //   let towif = privateWif.towif()
    /* let abc = await PrivateKey.randomKey();

    let privateKey = abc.toWif()
    console.log(privateKey)
    let pubkey = PrivateKey.fromString(privateKey).toPublic().toString()
    console.log(pubkey) */

    const privateKey = "5JamkxEHSjkRgXk46P4MZgz5uNtghh2kCLhe6j8v9jrgD4Rs6vV";
    //      5JamkxEHSjkRgXk46P4MZgz5uNtghh2kCLhe6j8v9jrgD4Rs6vV
    // EOS4xQz6cjRS5F8uZzHp962yuVDd7xdz9wTpezP5wH2WAXBKYsFca
    var account = "arunimaray12";
     let dataValue = { username: 'dsptestacc12' }
    //let dataValue = { vaccount: "arunimaray12" }

     let action = "hello"
    //let action = "regaccount"

    try {

        var res = await runTrx({
            contract_code: "dsptestac111",
            payload: {
                name: action,
                data: {
                    payload: dataValue
                }
            },
            wif: privateKey
        });
        console.log("re take action", res)
        return res;
    }
    catch (err) {
        throw (err);
    }




})
async function postData(url = ``, data = {}) {
    // Default options are marked with *
    console.log("in post data", data)
    try {
        /*   let res = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, cors, *same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                  // "Content-Type": "application/json",
                  // "Content-Type": "application/x-www-form-urlencoded",
              },
              redirect: 'follow', // manual, *follow, error
              referrer: 'no-referrer', // no-referrer, *client
              body: JSON.stringify(data) // body data type must match "Content-Type" header
          }) */
       /*  let res = await axios.post(url, {
            contract_code: data.contract_code,
            public_key: data.public_key,
            payload: data.payload,
            signature: data.signature
        }) */
          let res = await axios({
              url: url,
              method: 'POST',
              data: JSON.stringify(data)
          })
        console.log("post data res-", res.data)
        return res.data
    } catch (err) {
        console.log("err--",err.response.data.error.details)
        return err.response.data.error.details
    }
}

async function runTrx({ contract_code, payload, wif }) {
    // Default options are marked with *
    console.log("payload--", payload)
    // console.log("eos--",Eos.modules)
    const signatureProvider = new JsSignatureProvider([]);
    const api = new Api({
        rpc,
        signatureProvider,
        // chainId:"",
        textDecoder: new TextDecoder(),
        textEncoder: new TextEncoder(),
    });

    const response = await api.serializeActions([{
        account: contract_code,
        name: payload.name,
        authorization: [],
        data: payload.data
    }]);
    const toName = (name) => {
        var res = new BigNumber(Eos.modules.format.encodeName(name, true));
        res = (toBound(res.toString(16), 8));
        return res;
    }
    var datasize = toBound(new BigNumber(response[0].data.length / 2).toString(16), 1).match(/.{2}/g).reverse().join('');
    var payloadSerialized = "0000000000000000" + toName(payload.name) + "01" + "00000000000000000000000000000000" + datasize + response[0].data;
    return await postVirtualTx({
        contract_code,
        wif,
        payload: payloadSerialized
    });

}

async function postVirtualTx({ contract_code, wif, payload }) {
    // Default options are marked with *
    console.log("in postVirtual", payload)
    signature = ecc.sign(Buffer.from(payload, 'hex'), wif);
    const public_key = PrivateKey.fromString(wif).toPublic().toString()
    console.log("public key-", public_key)
    return postData(`${endpoint}/v1/dsp/accountless1/push_action`, {
        contract_code,
        public_key,
        payload,
        signature
    });


}




///////////////////////////////

app.listen(3000, function () {
    console.log('listening on 3000,')
});


////////////////

    // return fetch(url, {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, cors, *same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //         // "Content-Type": "application/json",
    //         // "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrer: 'no-referrer', // no-referrer, *client
    //     body: JSON.stringify(data) // body data type must match "Content-Type" header
    // })
    //     .then(response => 
    //         response.json()); // parses response to JSON