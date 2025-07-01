import {fetchDevices,getDeviceById} from './requesthandler.js';
const x=await fetchDevices();

const devices = ["web-server-01","db-server-01","storage-array-01","firewall-01","load-balancer-01","core-switch-01","edge-router-01","backup-server-01","monitor-node-01","vm-host-01"];
const imgContainers = document.querySelectorAll('.imgcont');

devices.forEach((device, index) => {
    const img = document.createElement('img');
    img.src = `./images/${device}.png`;
    img.alt = device;
    imgContainers[index].appendChild(img);
});

//const x=[{"id":1,"device_name":"web-server-01","ip_address":"192.168.1.10","cpu_usage":45.25,"ram_usage":26.61,"disk_free":760.33,"network_traffic":100.66,"temperature":70.92,"status":"GOOD"},{"id":2,"device_name":"firewall-01","ip_address":"192.168.1.1","cpu_usage":86.92,"ram_usage":30.47,"disk_free":594.49,"network_traffic":99.91,"temperature":41.88,"status":"CRITICAL"},{"id":3,"device_name":"core-switch-01","ip_address":"192.168.1.2","cpu_usage":49.55,"ram_usage":64.31,"disk_free":713.68,"network_traffic":344.58,"temperature":49.1,"status":"GOOD"},{"id":4,"device_name":"edge-router-01","ip_address":"192.168.1.3","cpu_usage":58.86,"ram_usage":78.36,"disk_free":210.58,"network_traffic":287.62,"temperature":49.55,"status":"WARNING"},{"id":5,"device_name":"backup-server-01","ip_address":"192.168.1.14","cpu_usage":93.62,"ram_usage":70.15,"disk_free":576.72,"network_traffic":385.88,"temperature":40.33,"status":"WARNING"},{"id":6,"device_name":"monitor-node-01","ip_address":"192.168.1.15","cpu_usage":60.35,"ram_usage":35.27,"disk_free":739.17,"network_traffic":394.64,"temperature":74.91,"status":"WARNING"},{"id":7,"device_name":"db-server-01","ip_address":"192.168.1.11","cpu_usage":44.89,"ram_usage":72.37,"disk_free":336.79,"network_traffic":220.88,"temperature":44.77,"status":"WARNING"},{"id":8,"device_name":"storage-array-01","ip_address":"192.168.1.12","cpu_usage":94.61,"ram_usage":96.56,"disk_free":989.3,"network_traffic":38.53,"temperature":49.49,"status":"CRITICAL"},{"id":9,"device_name":"load-balancer-01","ip_address":"192.168.1.13","cpu_usage":50.49,"ram_usage":34.72,"disk_free":72.45,"network_traffic":154.15,"temperature":54,"status":"GOOD"},{"id":10,"device_name":"vm-host-01","ip_address":"192.168.1.16","cpu_usage":20.6,"ram_usage":44.99,"disk_free":610.82,"network_traffic":394.88,"temperature":39.38,"status":"GOOD"}]

//forloop dom manipulation
if (!x) {
  console.error('No data received. Exiting...');
} else {
for(let i=0;i<x.length;i++){
const ip=document.querySelector(`.ipaddress${i+1}`);
const status=document.querySelector(`.statuscon${i+1}`);
const access=document.querySelector(`.access${i+1}`);
if(ip&&status&&access){
    ip.innerHTML=x[i].ip_address;
    status.innerHTML=`STATUS:${x[i].status}`;
    //changing access button using current status
    switch(x[i].status){
           case 'GOOD':
        access.style.backgroundColor = 'green';
            break;
              case 'WARNING':
        access.style.backgroundColor = 'yellow';
            break;
              case 'CRITICAL':
        access.style.backgroundColor = 'red';
            break;
    }
}
}
 // 🔘 Handle Access Button Clicks
  // Select all buttons that have the data-id attribute
  const buttons = document.querySelectorAll('button[data-id]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id; // get the id from data-id
      const deviceData = await getDeviceById(id);

      if (deviceData) {
        localStorage.setItem('selectedDevice', JSON.stringify(deviceData));
        window.location.href = 'status.html';
      } else {
        alert('Device data not available');
      }
    });
  });

}

  








