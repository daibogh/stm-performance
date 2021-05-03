const timers = {};
module.exports = (io, socket) => {
  // обрабатываем запрос на получение сообщений
  const getList = () => {
    console.log('list:get');
    const lst = [
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
      Math.round(Math.random() * 10),
    ];

    const timer = setInterval(() => {
      const rndIndex = Math.floor(Math.random() * lst.length);
      const rndItem = Math.round(Math.random() * 10);
      console.log([rndIndex, rndItem]);
      socket.emit('list:update', [rndIndex, rndItem]);
    }, 100);
    timers[socket.roomId] = timer;
    socket.on('disconnect', () => {
      const timer = timers[socket.roomId];
      if (!!timer) {
        clearInterval(timer);
        timers[socket.roomId] = undefined;
      }
    });
    socket.emit('list:value', lst);
  };

  // регистрируем обработчики
  socket.on('list:get', getList);
};
