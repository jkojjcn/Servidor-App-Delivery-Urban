DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL, 
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'CLIENTE',
	'client/products/list',
	'2021-05-22',
	'2021-05-22'
);


INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'RESTAURANTE',
	'restaurant/orders/list',
	'2021-05-22',
	'2021-05-22'
);

INSERT INTO roles (
	name,
	route,
	created_at,
	updated_at
)
VALUES(
	'REPARTIDOR',
	'delivery/orders/list',
	'2021-05-22',
	'2021-05-22'
);


DROP TABLE IF EXISTS message CASCADE;
CREATE TABLE message(
	id BIGSERIAL PRIMARY KEY,
	type VARCHAR(90) NOT NULL,
	from_id BIGINT NULL,
	to_id BIGINT NULL,
	message_data VARCHAR(90) NULL,
	id_open VARCHAR(255) NULL,
	updated_at VARCHAR(255) NULL,
	created_at VARCHAR(255) NULL
);





DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	name VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	phone VARCHAR(80) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	password VARCHAR(255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	notification_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL,
	restaurantId VARCHAR(180) NOT NULL,
	description VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS categories_restaurants CASCADE;
CREATE TABLE categories_restaurants (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL,
	restaurantId VARCHAR(180) NULL DEFAULT a,
	description VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NULL,
	updated_at TIMESTAMP(0) NULL
);


DROP TABLE IF EXISTS restaurants CASCADE;
CREATE TABLE restaurants (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	price DECIMAL DEFAULT 0,
	image1 VARCHAR(255) NOT NULL,
	image2 VARCHAR(255) NULL,
	image3 VARCHAR(255) NULL,
	id_category BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
);



DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	price DECIMAL DEFAULT 0,
	image1 VARCHAR(255) NOT NULL,
	image2 VARCHAR(255) NULL,
	image3 VARCHAR(255) NULL,
	id_category BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS address CASCADE;
CREATE TABLE address(
	id BIGSERIAL PRIMARY KEY,
	id_user BIGINT NOT NULL,
	address VARCHAR(255) NOT NULL,
	neighborhood VARCHAR(255) NOT NULL,
	lat DECIMAL DEFAULT 0,
	lng DECIMAL DEFAULT 0,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);




DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders(
	id BIGSERIAL PRIMARY KEY,
	id_client BIGINT NOT NULL,
	id_delivery BIGINT NULL,
	id_address BIGINT NOT NULL,
	lat DECIMAL DEFAULT 0,
	lng DECIMAL DEFAULT 0,
	status VARCHAR(90) NOT NULL,
	timestamp BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_client) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_delivery) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_address) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS order_has_products CASCADE;
CREATE TABLE order_has_products(
	id BIGSERIAL PRIMARY KEY
	id_order BIGINT NOT NULL,
	id_product BIGINT NOT NULL,
	quantity BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	features VARCHAR(900) NULL
);

ALTER TABLE order_has_products
ADD COLUMN id BIGSERIAL PRIMARY KEY,


//FOREIGN KEY(id_order) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE


CREATE TABLE chats(
	id BIGSERIAL PRIMARY KEY,
	id_user1 BIGINT NOT NULL,
	id_user2 BIGINT NOT NULL,
	timestamp BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user1) REFERENCE users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(id_user2) REFERENCE users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS taxi_request CASCADE;
CREATE TABLE taxi_request(
	id BIGSERIAL PRIMARY KEY,
	request_status VARCHAR(255),
	id_user BIGINT NOT NULL,
	id_taxi BIGINT NULL,
	id_time BIGINT NULL,
	id_address BIGINT NOT NULL,
	lat DECIMAL DEFAULT 0,
	lng DECIMAL DEFAULT 0,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	arrived_at TIMESTAMP(0) NOT NULL
);

CREATE TABLE messages(
	id BIGSERIAL PRIMARY KEY,
	message TEXT NOT NULL,
	url VARCHAR(255) NULL,
	is_image BOOLEAN DEFAULT FALSE,
	is_video BOOLEAN DEFAULT FALSE,
	id_sender BIGINT NOT NULL,
	id_receiver BIGINT NOT NULL,
	id_chat BIGINT NOT NULL,
	status VARCHAR(80) NOT NULL,
	timestamp BIGINT NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_sender) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(id_receiver) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(id_chat) REFERENCES chats(id) ON DELETE CASCADE ON UPDATE CASCADE
);