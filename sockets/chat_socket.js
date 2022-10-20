

module.exports = (io) => {


    const chatNSP = io.of('/chat');
    chatNSP.on('connection', function(socket){
        console.log('USUARIO SE CONECTÓ A SOCKET IO CHAT', socket.id);


        socket.on('message', function(data) {
            console.log('Nuevo mensaje', data);
            chatNSP.emit(`message/${data.id_chat}`, data);
            chatNSP.emit(`message/${data.id_user}`, data);
        });

        socket.on('writing', function(data) {
            console.log('Usuario escribiendo', data);
            chatNSP.emit(`writing/${data.id_chat}/${data.id_user}`, data);
        });
        
        socket.on('seen', function(data) {
            console.log('Mensaje visto', data);
            chatNSP.emit(`seen/${data.id_chat}`, data);
        });

        socket.on('disconnect', function(data){
            console.log('UN USUARIO SE DESCONECTÓ DE CHAT', socket.id);
        });



    })

    // ``

}