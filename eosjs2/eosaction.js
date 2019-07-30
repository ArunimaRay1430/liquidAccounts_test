/* const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')
const { OreId } = require('eos-auth'); */
 const { Api, JsonRpc, RpcError } = require('eosjs');
exports.API = Api
exports.JsonRpc = JsonRpc
exports.RpcError = RpcError
const JsSignatureProvider = require('eosjs/dist/eosjs-jssig').default;
exports.JsSignatureProvider = JsSignatureProvider  // development only
const fetch = require('node-fetch');                            // node only; not needed in browsers
 const { TextEncoder, TextDecoder } = require('util');
//const defaultPrivateKey = process.env.private_key;
 const signatureProvider = new JsSignatureProvider([]);
//export const httpEndpoint = 'https://kylin-dsp-2.liquidapps.io';
//const httpEndpoint = 'http://moonstaging.blockstartdsp.com:13115';
//const rpc = new JsonRpc(httpEndpoint, { fetch })
//const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
//const oreId = new OreId({ appName: "moonlight", appId: process.env.API_ID, apiKey: process.env.API_KEY, serviceKey: process.env.SERVICE_KEY, oreIdUrl: process.env.ORE_URL });

/* 
export async function eostransact (resultid)
{

        const tabres = await api.rpc.get_table_rows({
            code: process.env.contract,
            json: true,
            limit: 1,
            lower_bound: resultid.toString(),
            scope: process.env.contract,
            table: process.env.verifytable,
            upper_bound: resultid.toString()
        })
        return tabres
}

export async function serializetrx (resultcontract1)
{
    var result = [];
    var keys = Object.keys(resultcontract1.serializedTransaction);
    keys.forEach(function (key) {
        result.push(resultcontract1.serializedTransaction[key]);
    });
    resultcontract1.serializedTransaction = new Uint8Array(result)
    console.log(resultcontract1);
    let finalres = await api.pushSignedTransaction(resultcontract1)
    return finalres
}

export async function getTransaction (trxid)
{
    const temp = await api.rpc.history_get_transaction(trxid)//JsonRpc.history_get_transaction({id:trxid})
   console.log(temp)
    /* const temp = await axios.post("http://moonstaging.blockstartdsp.com:13115/v1/history/get_transaction", {
                id: trxid,
                block_num_hint: block_num
            }) 
    return temp
} */