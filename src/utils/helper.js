const dotenv = require('dotenv')
dotenv.config()


const axios = require('axios');
const { response } = require('express');

const { API_KEY, ISSUER_DID, RECIPIENT_DID, ENVIRONMENT } = process.env;
const environment = ENVIRONMENT || 'testnet';
const  apiUrl = environment === 'testnet' ? 'https://api-testnet.dock.io' : 'https://api.dock.io';

// We can send multiple credentials in one message
const CREDENTIAL_COUNT = 1;

class Security {
    API_KEY;
    ISSUER_DID;
    RECIPIENT_DID;

    constructor(){
        this.API_KEY = API_KEY;
        this.ISSUER_DID = ISSUER_DID;
        this.RECIPIENT_DID = RECIPIENT_DID;   

    }

    async createDID (){
        try {
            
            const data = {
                "type": "dock",
                "keyType": "ed25519"
            };
            const response = await axois.post(
                `${apiUrl}/dids`, 
            {data}, 
            {
                headers:{
                    'DOCK-API-TOKEN': `${this.API_KEY}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            
            const request = response.data
            console.log(request);
            return request;
        } catch (error) {
            throw error
        }
    }

}

module.exports = {
    Security
}