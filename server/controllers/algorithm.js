const spawn = require('child_process').spawn;

/* FUNCTIONS */

module.exports = {
  
    pythonmatching(req,res){
      var largeDataSet ;
      // spawn new child process to call the python script
      const process = spawn('python', ['./algorithm/algorithm.py',req.body.arguments]);
      //console.log(reg.body.arguments);
      // collect data from script
      process.stdout.on('data',(data)=>{
        console.log(data.toString());
        largeDataSet=data;
      });
    
      
      // in close event we are sure that stream is from child process is closed
      process.on('close', code => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      res.send(largeDataSet)
      });
    }
};
