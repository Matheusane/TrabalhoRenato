CREATE TABLE `editoras` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(255) DEFAULT NULL,
  `Fundacao` VARCHAR(255) NOT NULL,
  `CNPJ` VARCHAR(255) NOT null,
  `Contato` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);


INSERT INTO `editoras` (`Nome`, `Fundacao`, `CNPJ`, `Contato`, `Email`) 
VALUES ('Editora ABC', '1990-01-15', 12345678901234, 'João Silva', 'joao@editoraabc.com');
INSERT INTO `editoras` (`Nome`, `Fundacao`, `CNPJ`, `Contato`, `Email`) 
VALUES ('Editora XYZ', '1985-05-20', 98765432109876, 'Maria Oliveira', 'maria@editoraxyz.com');
INSERT INTO `editoras` (`Nome`, `Fundacao`, `CNPJ`, `Contato`, `Email`) 
VALUES ('Editora 123', '2000-11-08', 56789012345678, 'Carlos Pereira', 'carlos@editora123.com');

