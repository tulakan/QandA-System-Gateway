var noble = require('noble');
noble.on('stateChange', function (state) {
    if (state === 'poweredOn') {
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});


var noble = require('noble');
noble.on('stateChange', function (state) {
    console.log('state : ' + state);
    if (state === 'poweredOn') {
        noble.startScanning([], true);
    } else {
        noble.stopScanning();
    }
});


noble.on('discover', function (peripheral) {
    //   console.log('peripheral discovered (' + peripheral.id +
    //               ' with address <' + peripheral.address +  ', ' + peripheral.addressType + '>,' +
    //               ' connectable ' + peripheral.connectable + ',' +
    //               ' RSSI ' + peripheral.rssi + ':');
    //   console.log('\thello my local name is:');
    //   console.log('\t\t' + peripheral.advertisement.localName);
    //   console.log('\tcan I interest you in any of the following advertised services:');
    //   console.log('\t\t' + JSON.stringify(peripheral.advertisement.serviceUuids));

    //   var serviceData = peripheral.advertisement.serviceData;
    //   if (serviceData && serviceData.length) {
    //     console.log('\there is my service data:');
    //     for (var i in serviceData) {
    //       console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
    //     }
    //   }
    //   if (peripheral.advertisement.manufacturerData) {
    //     console.log('\there is my manufacturer data:');
    //     console.log('\t\t' + JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex')));
    //   }
    //   if (peripheral.advertisement.txPowerLevel !== undefined) {
    //     console.log('\tmy TX power level is:');
    //     console.log('\t\t' + peripheral.advertisement.txPowerLevel);
    //   }

    //   console.log();
    // console.log("on discover");
    if (peripheral.address == 'e9:85:a4:34:d0:2a') {
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