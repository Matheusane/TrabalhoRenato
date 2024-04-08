CREATE TABLE generos (
  id INT NOT NULL AUTO_INCREMENT,
  codigo INT NOT NULL,
  descricao VARCHAR(100),
  isAtivo BOOLEAN,
  PRIMARY KEY (id)
);

INSERT INTO
  generos (codigo, descricao, isAtivo)
VALUES
  (1, 'Ação', true),
  (2, 'Comédia', true),
  (3, 'Drama', false),
  (4, 'Ficção Científica', true);