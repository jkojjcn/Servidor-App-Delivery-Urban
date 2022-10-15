const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const io = require('socket.io')(server);




admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})


/*
* RUTAS
*/
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const restaurants = require('./routes/restaurantsRoutes');
const categories_restaurants = require('./routes/categoriesRestaurantsRoutes');
const address = require('./routes/addressRoutes');
const orders = require('./routes/ordersRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');
const message = require('./routes/messageRoutes');
const taxi = require('./routes/taxiRoutes');
const chats = require('./routes/chatsRoutes');

const chatSocket = require('./sockets/chat_socket');
const orderDeliverySocket = require('./sockets/orders_delivery_socket');



const port = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

// LLAMAR A LOS SOCKETS
orderDeliverySocket(io);
chatSocket(io);


// test gittt
/*
* LLAMANDO A LA RUTAS
*/
users(app, upload);
categories(app);
address(app);
orders(app);
products(app, upload);
categories_restaurants(app);
restaurants(app, upload);
mercadoPagoRoutes(app);
taxi(app);
chats(app);
message(app);


server.listen((process.env.PORT), function(){

    console.log('Aplicación de NodeJs ' + port + 'Iniciada..')

});


// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}
