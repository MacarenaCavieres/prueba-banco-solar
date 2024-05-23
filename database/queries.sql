drop table if exists transferencias;
drop table if exists usuarios;

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY, 
	nombre VARCHAR(50), 
	balance FLOAT CHECK (balance >= 0)
);


CREATE TABLE transferencias (
	id SERIAL PRIMARY KEY, 
	emisor INT, 
	receptor INT, 
	monto FLOAT, 
	fecha TIMESTAMP, 
	FOREIGN KEY (emisor) REFERENCES usuarios(id), 
	FOREIGN KEY (receptor) REFERENCES usuarios(id)
);

select * from usuarios;
select * from transferencias;

-- seeders

insert into usuarios (nombre,balance) values
("Juan", 300000),
("Carla", 400000);
