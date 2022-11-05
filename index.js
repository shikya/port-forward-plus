const { exec, spawn } = require("child_process");
const yaml = require('js-yaml');
const fs   = require('fs');

// read yaml and parse
const config = yaml.load(fs.readFileSync('services.yaml', 'utf8'));
console.log(config);

config.services.map((service, index, array) => {
  console.log(JSON.stringify(service));
  return getPortForward(index, service.name, service.port.source, service.port.destination);
});

// get list of services

function getPortForward(index, name, source, destination) {

  console.log(`Starting service ${name} on port ${destination}`);
  // start child process
  const child = spawn('kubectl', ['port-forward', name, `${source}:${destination}`]);

  child.stdout.on('data', (data) => {
      console.log(`child process data with code ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr2: ${data}`);
    child.kill();
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    child.kill();
  });

  return child;
}

