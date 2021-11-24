import web3 from "./web";
import compiledFactoy from './build/CampaignFactory.json';


const instance =  new web3.eth.Contract(
    JSON.parse(compiledFactoy.interface) ,
    '0x0f6886F5E00b44e5652a1826e79ECe763D3070Fa'
);

export default instance;