import express from 'express';
import {main} from './xdatabase.js';
import cors from 'cors';
const app=express();

app.use(express.json());
app.use(cors());

let loadeddata=[];

app.get('/device',async(req,res)=>{
    console.log('user is accessing the home page');
    res.json(loadeddata);
    
});
app.get('/device/:id',async(req,res)=>{
    const {id}=req.params;
    const data=loadeddata;
    console.log(`accessing ${data[id-1].device_name}`);
   res.json(data[id-1]);
});

// Refresh database every 10 seconds with new data
async function refreshData() {
  loadeddata = await main(); // fetch new values + status
  console.log('Updated data fetched from DB');
}

app.listen(2000,async()=>{
    console.log('server is listening');
      // Initial load
  await refreshData();
    setInterval(refreshData, 5000);
    console.log('data is loaded from the database');
    
});








