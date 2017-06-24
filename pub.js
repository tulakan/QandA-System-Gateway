var mqtt = require('mqtt')
var options = {
    port: 16317,
    host: 'mqtt://m12.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'hduypxmn',
    password: '0lJtYsmmA8Pm',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('mqtt://m12.cloudmqtt.com', options)

function stop() {
    var stopData = {
        "scanState": false,
    }
    var stopDataString = JSON.stringify(stopData);

    client.publish('gateway-ble', stopDataString),
    console.log("send top")
    client.end()
}

client.on('connect', function () {
    // client.subscribe('presence')
    // console.log("subscribed")
    var startData = {
        "scanState": true,
        "deviceUUID": [
            'e9:85:a4:34:d0:2a',
            'e3:85:a4:34:d0:23'
        ]
    }

    

    var startDataString = JSON.stringify(startData);
    client.publish('gateway-ble', startDataString)
    console.log("send start")
    setTimeout(stop, 3000);
    
})



client.on('message', function (topic, message) {
    // message is Buffer
    console.log("message :", message.toString())

})