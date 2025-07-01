
export async function getDeviceById(id) {
  try {
    const response = await axios.get(`http://localhost:2000/device/${id}`);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error('Error fetching device:', error);
  }
}

  export async function fetchDevices() {
  try {
    const response = await axios.get('http://localhost:2000/device');
    console.log("Data received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchDevices()