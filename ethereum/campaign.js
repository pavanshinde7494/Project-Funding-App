import web3 from "./web";
import Campaign from './build/Campaign.json';

export default (address)=>{
    const instance =  new web3.eth.Contract(
        JSON.parse(Campaign.interface) ,
        address
    );
    return instance;
}