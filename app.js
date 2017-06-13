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
    } else {
        noble.stopScanning();
    }
});

client.on('connect', function () {
    client.subscribe('presence')
    console.log("subscribed")
    //   client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log("message :", message.toString())
    if (message.toString() == 'scan') {
        console.log("Scaning for BLE Device")
        noble.on('discover', function (peripheral) {
            console.log("on discover");
            if (peripheral.address == 'e9:85:a4:34:d0:2a') {
                console.log("correct");
                console.log("TIME: " + new Date().getTime());
                console.log('on -> Name: ' + peripheral.advertisement.localName);
                console.log('on -> Address: ' + peripheral.address);

                var UUID = peripheral.advertisement.manufacturerData.slice(4, 20);
                console.log('on -> UUID: ' + toHexString(UUID));

                var Mojor = peripheral.advertisement.manufacturerData.slice(20, 22);
                console.log('on -> Major: ' + toHexString(Mojor));

                Minor = peripheral.advertisement.manufacturerData.slice(22, 24);
                console.log('on -> Minor: ' + toHexString(Minor));
                console.log('=======================================');
            } else {
                console.log("incorrect !");
            }
        });
    }
    //   client.end()
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