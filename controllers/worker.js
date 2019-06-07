var udev = require("udev");

console.log("child process ran!");
console.error('child process error!');
console.log("Env:",process.env.subsystem);
console.log("Env:",process.env.events);
console.log("Env:",process.env.actionFile);

var eventsList=process.env.events.split(",");
var rule = {
  subsystem : process.env.subsystem,
  events : eventsList,
  actionFile : process.env.actionFile
}

console.log(rule);
var monitor = udev.monitor(rule.subsystem);
monitor.on('add', function (device) {
      console.log('added ' + JSON.stringify(device));
      console.log(`gonna run file ${rule.actionFile}`);
      // monitor.close() // this closes the monitor.
    });

// rule.events.forEach(function(event){
//   console.log(`Adding Event ${event}`);
//   monitor.on(event, function (device) {
//     console.log('added ' + JSON.stringify(device));
//     console.log(`gonna run file ${rule.actionFile}`);
//     // monitor.close() // this closes the monitor.
//   });
// });
