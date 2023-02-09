const { exec, spawn } = require("child_process");
const yaml = require('js-yaml');
const fs   = require('fs');

// read yaml and parse
const config = yaml.load(fs.readFileSync('services-1.yaml', 'utf8'));
// console.log(config);

config.services.map((service, index, array) => {
  // console.log(JSON.stringify(service));
  getPortForward(index, service.name, service.port.local, service.port.pod);
});

// get list of services

function getPortForward(index, name, source, destination) {

  console.log(`Starting ${name} on port ${destination}`);
  // start child process
  let child = spawn('kubectl', ['port-forward', name, `${source}:${destination}`]);

  child.stdout.on('data', (data) => {
      console.log(`child process stdout data ${name}\t\tdata with code ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`child process stderr data ${name}\t\tstderr2 ${name}: ${data}`);
    child.kill();
  });

  child.on('close', (code) => {
    console.log(`child process close code ${name}\t\texited with code ${code}`);
    child.kill();
    setTimeout(() => {
      getPortForward(index, name, source, destination)
    }, 1000);
  });

  return child;
}

