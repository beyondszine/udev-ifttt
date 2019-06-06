var express = require('express');
var router = express.Router();
var udev = require("udev");
var bodyParser = require('body-parser');

router.use(bodyParser.json());


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
    return res.send("List of all udev-rules");
  })
  .post(function(req,res){
    return res.send(req.body);
  });


router.route('/subsystems')
  .get(function(req,res){
    getAllSubsystems()
    .then( (uniqueDevList) =>{
        return res.send({"_items":uniqueDevList});
    })
  });


module.exports = router;
