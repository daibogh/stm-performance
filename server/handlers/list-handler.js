const timers = {};
module.exports = (io, socket) => {
  // обрабатываем запрос на получение сообщений
  const getList = () => {
    console.log('list:get');
    const lst = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let idx = 0;
    const timer = setInterval(() => {
      const rndIndex = idx % lst.length;
      idx++;
      socket.emit('list:update', [rndIndex]);
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
