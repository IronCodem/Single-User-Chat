var io = require('socket.io-client');
var socket = io("https://Socket-io-thingy.jbyt27.repl.co");
const chalk=require("chalk")

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function chat(){
	rl.question(">>> ", (answer) => {
    socket.emit("message",id+": "+chalk.green(answer));
    chat();
  });
}


socket.on('connect', () => {
  console.clear()
	rl.question(`What's your USERNAME? `, (answer) => {
      console.clear()
			socket.emit("message", `👤: ${answer} has joined the chat`);
			id = answer;
			chat();
  });
  socket.on('msg', function(data){
    console.log("\n" + data);
    chat();
  });
})

socket.off('disconnect', () => {
  socket.emit("message", `Ω  : ${answer} has left the chat`);
  chat();
})
 
