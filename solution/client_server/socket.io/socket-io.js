exports.init = function(io) {
  // the chat namespace
  const chat= io
      .of('/chat1')
      .on('connection', function (socket) {
        try {
          /**
           * it creates or joins a button
           */
          socket.on('create or join', function (room, userId) {
            socket.join(room);
            chat.to(room).emit('joined', room, userId);
          });

          socket.on('chat1', function (room, userId, chatText) {
            chat.to(room).emit('chat1', room, userId, chatText);
          });

          socket.on('disconnect', function(){
            console.log('someone disconnected');
          });
        } catch (e) {
        }
      });
}
