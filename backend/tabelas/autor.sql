create TABLE `autor` (
  `ID` int not null AUTO_INCREMENT,
  `Nome` varchar(50) NULL,
  `Sobrenome` varchar(50) NULL,
  `DNascimento` DATE NULL,
  `CidadeNascimento` varchar(30) NULL,
  `Genero` varchar(15) NULL,
  `Email` varchar(100) NULL,
  `QntObras` varchar(4) NULL,
  PRIMARY KEY (`ID`)
)
INSERT INTO
  autor (Nome,Sobrenome,DNascimento,CidadeNascimento,Genero,Email,QntObras)
VALUES
  ('John','Doe','1990-05-15','Nova York','Masculino','john.doe@example.com','25'),
  ('Jane','Smith','1985-08-22','Los Angeles','Feminino','jane.smith@example.com','15'),
  ('Maria','Silva','1988-12-10','São Paulo','Feminino','maria.silva@example.com','20'),
  ('Carlos','Pereira','1975-06-28','Rio de Janeiro','Masculino','carlos.pereira@example.com','30'),
  ('Ana','Martins','1995-03-18','Belo Horizonte','Feminino','ana.martins@example.com','10');