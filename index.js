var udev = require("udev");

var udevlist = udev.list();
// console.log(udevlist); // this is a long list :)

var uniqueDevList = [];
udevlist.filter(function(dev,index){
    if(uniqueDevList.indexOf(dev.SUBSYSTEM) < 0){
        uniqueDevList.push(dev.SUBSYSTEM);
    }
});

console.log(`Total items in udevlist: ${udevlist.length}`);
console.log(`Unique in udevlist: ${uniqueDevList.length}`);
console.log(uniqueDevList);

var monitor = udev.monitor("tty");
monitor.on()
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