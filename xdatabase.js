import mysql2 from 'mysql2'
import dotenv from "dotenv"
import { Resend } from 'resend';

dotenv.config()
const pool=mysql2.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise();

//Resend setup
const resend = new Resend(process.env.RESEND_API_KEY);

// handle frequency of the text message
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//fetch the whole database 
    async function getAllDevices() {
  const [rows] = await pool.query(`
    SELECT * FROM device_stats ORDER BY id ASC
  `);
  return rows;
}


//classify the status of the devices into good,warning,critical
 function evaluateStatus(device){
      let status = 'GOOD';
        if (device.cpu_usage > 85){
          status = 'CRITICAL';
      }else if(device.cpu_usage >60){
        status='WARNING';
      }
      if(device.ram_usage > 90){
        status='CRITICAL';
      }else if(device.ram_usage > 70 && status !== 'Critical') {
        status='WARNING';
      }
      if(device.temperature > 80){
        status='CRITICAL';
        }else if(device.temperature > 60 && status === 'Good') {
          status = 'WARNING';
        }
      return status;
}

// Send email if critical
async function sendAlertEmail(subject, message){
  try{
    const{error}= await resend.emails.send({
      from: process.env.RESEND_EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject,
      html:`<p>${message}</p>`,
    });

    if(error){
      console.error('Email failed:',error);
    }else{
      console.log('Email sent:',subject);
    }
  }catch(err) {
    console.error('Unexpected error:',err);
  }
}



//add status to getalldevices print out
export async function main() {
  const data = await getAllDevices();
  const withStatus = await Promise.all(data.map(async device => {
    const status = evaluateStatus(device);

    // Send message when the status is only Critical
   /* if (status === 'CRITICAL') {
  await sendAlertEmail(
    `Critical Alert: ${device.device_name}`,
    `Device ${device.device_name} is in Critical status.<br><br>CPU: ${device.cpu_usage}%<br>RAM: ${device.ram_usage}%<br>Temp: ${device.temperature}°C`
  );
  await delay(10000);
}*/
    return {
      ...device,
      status
    };
  }));

  return withStatus;
}


