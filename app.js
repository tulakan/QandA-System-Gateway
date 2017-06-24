var noble = require('noble');
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
var noble = require('noble');
noble.on('stateChange', function (state) {
    console.log('state : ' + state);
    if (state === 'poweredOn') {
        noble.startScanning([], true);
        console.log("scanning");
    } else {
        noble.stopScanning();
        console.log("stop scan");
    }
});

client.on('connect', function () {
    client.subscribe('gateway-ble')
    console.log("subscribed")
})

var scanState = false;

client.on('message', function (topic, message) {
    // message is Buffer
    var data = JSON.parse(message);
    // console.log("message :", message.toString());
    // var massageObject = message;
    console.log(data)
    scanState = data.scanState;

    
    // if (message.toString() == 'scan') {
        
    // }
    //   client.end()
})

noble.on('discover', function (peripheral) {
    console.log("on discover");
    if(scanState){
        console.log("getting data !");
    }else{
        console.log("stop");
    }
    if (peripheral.address == 'e9:85:a4:34:d0:2a') {
        // console.log("correct");
        // console.log("TIME: " + new Date().getTime());
        // console.log('on -> Name: ' + peripheral.advertisement.localName);
        // console.log('on -> Address: ' + peripheral.address);

        // var UUID = peripheral.advertisement.manufacturerData.slice(4, 20);
        // console.log('on -> UUID: ' + toHexString(UUID));

        var Mojor = peripheral.advertisement.manufacturerData.slice(20, 22);
        // console.log('on -> Major: ' + toHexString(Mojor));
        console.log('Answer is : ' + toHexString(Mojor));

        // Minor = peripheral.advertisement.manufacturerData.slice(22, 24);
        // console.log('on -> Minor: ' + toHexString(Minor));
        // console.log('=======================================');
    }
});






// Functions Convert Byte to HexString
function toHexString(arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += ((arr[i] < 16) ? "0" : "") + arr[i].toString(16);
        str += ":";
    }
    return str;
}