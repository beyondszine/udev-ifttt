var express = require('express');
var router = express.Router();
var udev = require("udev");
var bodyParser = require('body-parser');
const childProcess = require('child_process');


router.use(bodyParser.json());

var monitorsList= [];

function addRules(rule){
  console.log(`adding rule for ${rule.subsystem}`);
  const cp=childProcess.fork('controllers/worker.js',[],{
    env: rule
  });  

  // cp.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });
  
  // cp.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`);
  // });
  
  cp.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  monitorsList.push(cp);
}

function getAllSubsystems(){
  return new Promise(function(resolve,reject){
    var uniqueDevList = [];
    var udevlist=udev.list();

    console.log(`total items in udev list: ${udevlist.length}`);
    udevlist.filter(function(dev,index){
      if(uniqueDevList.indexOf(dev.SUBSYSTEM) < 0){
        uniqueDevList.push(dev.SUBSYSTEM);
      }
      console.log(index);
      if(index==udevlist.length-1){
        resolve(uniqueDevList);
      }
    });
  });
}

router.route('/rules')
  .get(function(req,res){
    var resp={"rules":monitorsList};
    return res.send(resp);
  })
  .post(function(req,res){
    addRules(req.body);
    return res.send(req.body);
  })
  .delete(function(req,res){
    console.log("Killing one child process");
    monitorsList[0].kill("SIGINT");
  });


router.route('/subsystems')
  .get(function(req,res){
    getAllSubsystems()
    .then( (uniqueDevList) =>{
        return res.send({"_items":uniqueDevList});
    })
  });

module.exports = router;
