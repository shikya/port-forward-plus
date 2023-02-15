const cfonts = require('cfonts');

var Table = require('cli-table');

// instantiate
var table = new Table({
    head: ['', 'Service Name', 'Last call']
  , colWidths: [4, 30, 40]
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
// 
table.push(
    ['✓', 'Service 1', '1 min ago']
  , ['✕', 'Service 2', '0 sec ago']
);

setInterval(() => {
    // process.stdout.write("000");
    // process.stdout.write("\n111");
    // process.stdout.write("\n222");
    process.stdout.write('\033c')
    cfonts.say('port forward +', {
        font: 'simple',              // define the font face
        align: 'left',              // define text alignment
        colors: ['magenta'],         // define all colors
        background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
        letterSpacing: 1,           // define letter spacing
        lineHeight: 1,              // define the line height
        space: true,                // define if the output text should have empty lines on top and on the bottom
        maxLength: '0',             // define how many character can be on one line
        gradient: false,            // define your two gradient colors
        independentGradient: false, // define if you want to recalculate the gradient for each new line
        transitionGradient: false,  // define if this is a transition between colors directly
        env: 'node'                 // define the environment cfonts is being executed in
    });    
    process.stdout.write(table.toString());
    // process.stdout.write("\r\x1b[K")
    // process.stdout.write("333");
        // console.log('he');
}, 1000);
