use innpactia;

create table persona(
    persona_id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(75),
    correo VARCHAR(100) UNIQUE,
    genero VARCHAR(30),
    estado SMALLINT(1),
    fecha_registro DATE,
    usr_registro VARCHAR(100)
    );
    
    create table usuario(
    usuario_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    persona_id INT NOT NULL,
    usuario VARCHAR(100) UNIQUE,
    contrasena VARCHAR(100),
    estado SMALLINT(1),
    fecha_registro DATE,
    usr_registro VARCHAR(100),
    
    CONSTRAINT FK_PERSONA_USUARIO
    FOREIGN KEY(persona_id)
    REFERENCES persona(persona_id)
    );
    
    create table cliente(
    cliente_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    persona_id INT NOT NULL,
    direccion VARCHAR(200),
    numero_telefono VARCHAR(50),
    fecha_registro DATE,
    usr_registro VARCHAR(100),
    
    CONSTRAINT FK_PERSONA_CLIENTE
    FOREIGN KEY(persona_id)
    REFERENCES persona(persona_id)
    );
    
    create table telefono(
    telefono_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    IMEI VARCHAR(15) NOT NULL UNIQUE,
    fecha_registro DATE,
    usr_registro VARCHAR(100),
    
    CONSTRAINT FK_CLIENTE_TELEFONO
    FOREIGN KEY(cliente_id)
    REFERENCES cliente(cliente_id)
    );
        
    create table reparaciones(
    reparacion_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    telefono_id INT NOT NULL,
    descripcion VARCHAR(300),
    fecha_inicio DATE,
    estado SMALLINT,
    fecha_finalizacion DATE,
    fecha_registro DATE,
    usr_registro VARCHAR(100),
    
    CONSTRAINT FK_TELEFONO_REPARACION
    FOREIGN KEY(telefono_id)
    REFERENCES telefono(telefono_id)
    );