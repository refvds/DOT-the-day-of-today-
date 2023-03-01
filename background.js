import { INDXDB } from './indxdb.js';
import { env } from './envs.js';
import { fetchedData } from './utilities.js';

let DB = new INDXDB('wallpapers',1);; 

chrome.runtime.onInstalled.addListener(async()=>{
    const request = await fetchedData(env.url,{headers: { Authorization: env.key }})
    const putted = await DB.putData(request);
    
});

chrome.runtime.onMessage.addListener((request,sender, sendMessage) => {
    if (request.message === 'get-data') {
        const images = DB.getData()
        images.then(image=>{
            console.log(image)
            sendMessage(image)  

        })
        return true;
    }
})
