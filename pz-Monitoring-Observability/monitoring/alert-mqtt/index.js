const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const mqttHost = process.env.MQTT_HOST || 'mqtt://mqtt:1883';
const client = mqtt.connect(mqttHost);
const app = express();
app.use(bodyParser.json());
app.post('/alert', (req,res)=>{
  const alerts = req.body.alerts || [];
  alerts.forEach(a=>{
    const msg = JSON.stringify({status:a.status, labels:a.labels, annotations:a.annotations});
    client.publish('alerts/service-status', msg);
    console.log('Published alert to MQTT:', msg);
  });
  res.sendStatus(200);
});
app.listen(5000, ()=>console.log('Alert MQTT receiver listening on 5000'));
