import { INDXDB } from './indxdb.js';
import { env } from './envs.js';
import { fetchedData } from './utilities.js';

let DB = null; 
let images = null;

chrome.runtime.onInstalled.addListener(async()=>{
    const request = await fetchedData(env.url,{headers: { Authorization: env.key }})
    DB = new INDXDB('wallpapers',1);
    const created = await DB.createDB();
    const putted = await DB.putData(created, request);
    const data = await DB.getData(created);
    images = data;
});

chrome.runtime.onMessage.addListener((request,sender, sendMessage) => {
    if (request.message === 'get-data') {
        sendMessage(images)
    }
})
