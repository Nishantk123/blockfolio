import openSocket from 'socket.io-client';
// const  socket = openSocket('https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD');
// function subscribeToTimer(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }
export { subscribeToTimer };