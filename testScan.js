var noble = require('noble');
var Minor = "";
var a = "";
console.log('Program Start....');


// Functions Convert Byte to HexString
function toHexString(arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        str += ((arr[i] < 16) ? "0" : "") + arr[i].toString(16);
        str += ":";
    }
    return str;
}


noble.on('stateChange', function (state) {   // Event การเปลี่ยนแปลงสถานะของ Bluetooth เมื่อโปรแกรมสั่งเปิด
    console.log('on -> stateChange: ' + state);
    console.log('Bluetooth ON...');
    if (state === 'poweredOn') {
        noble.startScanning([], true);   // เมื่อ Bluetooth On แล้วให้ทำการสั่ง Scan ||  [] any service UUID, allow duplicates, true ค้นหาแบบไม่กำหนดเวลา
        console.log('Bluetooth Scanner...');
    } else {
        noble.stopScanning();
        console.log('Not working...');
    }
});

noble.on('scanStart', function () {
    console.log('on -> scanStart');
});

noble.on('scanStop', function () {
    console.log('on -> scanStop');
});



noble.on('discover', function (peripheral) {  // return BLE Device ที่อยู่รอบๆ

    if (peripheral.address == 'e9:85:a4:34:d0:2a') {
        console.log("TIME: " + new Date().getTime());
        console.log('on -> Name: ' + peripheral.advertisement.localName);
        console.log('on -> Address: ' + peripheral.address);

        // var UUID = peripheral.advertisement.manufacturerData.slice(4, 20);
        // console.log('on -> UUID: ' + toHexString(UUID));

        // var Mojor = peripheral.advertisement.manufacturerData.slice(20, 22);
        var Mojor = peripheral.advertisement.manufacturerData[21]
        console.log('on -> Major: ' + Mojor);
        // console.log('manufacturerData --> ',peripheral.advertisement.manufacturerData);

        // Minor = peripheral.advertisement.manufacturerData.slice(22, 24);
        // console.log('on -> Minor: ' + toHexString(Minor));
        // console.log('=======================================');
        // if ((toHexString(Minor).localeCompare('00:14:')) == 0) {
        //     message = "Standby..";
        // } else if ((toHexString(Minor).localeCompare('00:15:')) == 0) {
        //     message = "Run!!";
        // }
        // console.log('Message --> ' + message);
    }
});
