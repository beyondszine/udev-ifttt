(function (){
    'use strict';

    var udev = require("udev");

    var udevlist = udev.list();

    function getAllSubsystems(){
        var uniqueDevList = [];
        udevlist.filter(function(dev,index){
            if(uniqueDevList.indexOf(dev.SUBSYSTEM) < 0){
                uniqueDevList.push(dev.SUBSYSTEM);
            }
        });
        return uniqueDevList;
    }
    console.log(`Total items in udevlist: ${udevlist.length}`);
    console.log(getAllSubsystems().length);

    // var monitor = udev.monitor("tty");
    // monitor.on()
    // monitor.on('add', function (device) {
    //     console.log('added ' + JSON.stringify(device));
    //     // monitor.close() // this closes the monitor.
    // });
    // monitor.on('remove', function (device) {
    //     console.log('removed ' + device);
    // });
    // monitor.on('change', function (device) {
    //     console.log('changed ' + device);
    // });
})();
