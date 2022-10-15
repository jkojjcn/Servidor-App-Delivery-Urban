

module.exports = (io) => {


    const chatNSP = io.of('/chat');
    chatNSP.on('connection', function(socket){
        console.log('USUARIO SE CONECTÓ A SOCKET IO CHAT', socket.id);

        socket.on('disconnect', function(data){
            console.log('UN USUARIO SE DESCONECTÓ DE CHAT', socket.id);
        });



    })

}