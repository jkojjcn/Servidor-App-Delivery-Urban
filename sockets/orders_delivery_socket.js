module.exports = (io) => {

    const orderDeliveryNamespace = io.of('/orders/delivery');
    orderDeliveryNamespace.on('connection', function(socket) {

        console.log('USUARIO CONECTADO AL NAMESPACE /orders/delivery');
        console.log(process.env.DATABASE_URL);

        socket.on('position', function(data) {
            console.log(`EMITIO ${JSON.stringify(data)}`);
            orderDeliveryNamespace.emit(`position/${data.id_order}`, { lat: data.lat, lng: data.lng, speed: data.speed, heading: data.heading  });
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DESCONECTADO');
        });
    });


    const allDeliveryLocation = io.of('/orders/allDelivery');
    allDeliveryLocation.on('connection', function(socket) {

        console.log('USUARIO CONECTADO AL ALLDELIVERY /orders/allDelivery');
        console.log(process.env.DATABASE_URL);

        socket.on('positionAD', function(data) {
            console.log(`EMITIO ${JSON.stringify(data)}`);
            allDeliveryLocation.emit(`position/${data.id}`, { lat: data.lat, lng: data.lng, speed: data.speed, heading: data.heading  });
        });

        socket.on('disconnect', function(data) {
            console.log('USUARIO DESCONECTADO de AD');
        });
    });



}