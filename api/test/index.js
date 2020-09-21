const socket = io.connect("ws://localhost");
socket.on("message", console.log);
console.log(socket);
