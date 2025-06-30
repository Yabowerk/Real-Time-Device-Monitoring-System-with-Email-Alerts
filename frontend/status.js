window.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('selectedDevice'));

  if (!data) {
    alert('No device data found!');
    return;
  }

  document.querySelector('.devicename').textContent = data.device_name;
  document.querySelector('.status').textContent = `STATUS: ${data.status}`;

  document.querySelector('.a').textContent = `IP: ${data.ip_address}`;
  document.querySelector('.b').textContent = `CPU-USAGE: ${data.cpu_usage}%`;
  document.querySelector('.c').textContent = `RAM-USAGE: ${data.ram_usage}%`;
  document.querySelector('.d').textContent = `DISK-FREE: ${data.disk_free} GB`;
  document.querySelector('.e').textContent = `NETWORK-TRAFFIC: ${data.network_traffic} Mbps`;
  document.querySelector('.f').textContent = `TEMPERATURE: ${data.temperature} °C`;

  // Optional: change the image dynamically
  document.querySelector('.imgcont img').src = `images/${data.device_name}.png`;
});