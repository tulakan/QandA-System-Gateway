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
var UUIDList = [];

client.on('message', function (topic, message) {
    // message is Buffer
    var scandata = JSON.parse(message);
    // console.log("message :", message.toString());
    // var massageObject = message;
    scanState = scandata.scanState;
    console.log('UUIDList.length --> ', UUIDList.length);
    if (scanState) {
        UUIDList = scandata.deviceUUID;  

        //todo test scan device in uuidList
        noble.on('discover', function (peripheral) {
            UUIDList.forEach((deviceUUID) => {
                if (peripheral.address == deviceUUID) {
                    var Mojor = peripheral.advertisement.manufacturerData.slice(20, 22);
                    console.log('deviceUUID : ', deviceUUID, ' Answer is : ' + toHexString(Mojor));
                }
            })
        });
        //todo test scan device in uuidList
    } else {
        console.log('not scan');
    }
})



// Functions Convert Byte to HexString
function toHexString(arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += ((arr[i] < 16) ? "0" : "") + arr[i].toString(16);
        str += ":";
    }
    return str;
}