var noble = require('noble');
var mqtt = require('mqtt')


//CLI argument
var classIdx = process.argv[2]
var roomIdx = process.argv[3]
console.log('classroom --> ', classIdx, 'roomIdx --> ', roomIdx);
console.log('new upload')

//mqtt options 
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
        // noble.startScanning([], true);
        // console.log("scanning");
    } else {
        // noble.stopScanning();
        // console.log("stop scan");
    }
});

client.on('connect', function () {
    client.subscribe('gateway-ble/' + classIdx + '/' + roomIdx)
    console.log('subscribed in topic : gateway-ble/' + classIdx + '/' + roomIdx)
})

noble.on('discover', function (peripheral) {
    console.log('on discover');
    var address = peripheral.address;
    var Mojor = peripheral.advertisement.manufacturerData.slice(20, 21);
    // var Mojor = MojorBuffer[MojorBuffer.le-1]

    if (peripheral.address == 'e9:85:a4:34:d0:2a') {
        console.log('----------------------------------------------------------------------------------');
        console.log('address : ', address, ' Answer is : ' + toHexString(Mojor));
        console.log('Mojor -- >', peripheral.major);
        console.log('----------------------------------------------------------------------------------');
    } else {
        console.log('address : ', address, ' Answer is : ' + toHexString(Mojor));
    }
});

var scanState = false;
var UUIDList;

client.on('message', function (topic, data) {

    console.log('typeof data ----> ', typeof data);
    if (typeof data === 'string') {
        var parseedData = data
    } else {
        var parseedData = JSON.parse(data);
    }
    // console.log('on message arrive : parseedData -> ', parseedData);


    //if check state
    if (parseedData == 'checkBLEScanState') {
        console.log('on GW check state');
        var sendStateTopic = 'gateway-ble/' + classIdx + '/' + roomIdx + '/checkBLEScanState'
        console.log('sendStateTopic --> ', sendStateTopic);
        var bleState = noble.state;
        console.log('bleState --> ', bleState);
        if (bleState == 'poweredOn') {
            client.publish(sendStateTopic, 'ready');
        } else {
            client.publish(sendStateTopic, 'not ready');
        }
    }

    if (parseedData.message != undefined && parseedData.message == 'sendingMacAdressDATA') {
        console.log('on sendingMacAdressDATA');
        UUIDList = parseedData.macAddressList
        console.log('UUIDList --> ', UUIDList);
    }


    if (parseedData.message != undefined && parseedData.message == 'startScan') {
        console.log('on startScan');
        var bleState = noble.state;
        if (bleState == 'poweredOn') {
            noble.startScanning([], true);
        } else {
            noble.stopScanning();
        }
    }

    if (parseedData.message != undefined && parseedData.message == 'stopScan') {
        console.log('on stopScan');
        var bleState = noble.state;
        if (bleState == 'poweredOn') {
            noble.stopScanning();
        } else {
            noble.stopScanning();
        }
    }





















    // message is Buffer
    // var scandata = JSON.parse(message);
    // // console.log("message :", message.toString());
    // // var massageObject = message;
    // scanState = scandata.scanState;
    // console.log('UUIDList.length --> ', UUIDList.length);
    // console.log('UUIDList --> ', UUIDList);
    // if (scanState) {
    //     UUIDList = scandata.deviceUUID;

    //     //todo test scan device in uuidList
    //     noble.on('discover', function (peripheral) {
    //         UUIDList.forEach((deviceUUID) => {
    //             if (peripheral.address == deviceUUID) {
    //                 var Mojor = peripheral.advertisement.manufacturerData.slice(20, 22);
    //                 console.log('deviceUUID : ', deviceUUID, ' Answer is : ' + toHexString(Mojor));
    //             }
    //         })
    //     });
    //     //todo test scan device in uuidList
    // } else {
    //     console.log('not scan');
    // }
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