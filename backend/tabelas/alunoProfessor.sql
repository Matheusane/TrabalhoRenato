CREATE TABLE alunoProfessor (
  Nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL primary key,
  DataNascimento DATE NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Cidade VARCHAR(100) NOT NULL,
  Telefone VARCHAR (15) NOT NULL,
  Rua VARCHAR(100) NOT NULL,
  Numero VARCHAR(10) NOT NULL,
  cep VARCHAR(9) NOT NULL,
  TipoPessoa VARCHAR(50) NOT NULL
);

INSERT INTO
  alunoProfessor (Nome, CPF, DataNascimento, Email, Cidade, Telefone, Rua, Numero, CEP, TipoPessoa)
VALUES
  ('João Silva', '123.456.789-00', '1990-05-15', 'joao.silva@email.com', 'São Paulo', '(11) 9876-5432', 'Rua ABC', '123', '01234-567', 'Aluno'),
  ('Maria Oliveira','987.654.321-00','1988-12-03','maria.oliveira@email.com','Rio de Janeiro','(21) 8765-4321','Avenida XYZ','456','89012-345','Professor'),
  ('Pedro Santos','111.222.333-44','1995-08-22','pedro.santos@email.com','Brasília','(61) 7654-3210','Praça DEF','789','45678-901','Aluno'),
  ('Ana Pereira','555.666.777-88','1987-04-11','ana.pereira@email.com','Belo Horizonte','(31) 6543-2109','Alameda GHI','101','23456-789','Aluno'),
  ('Carlos Lima','999.888.777-66','1980-11-28','carlos.lima@email.com','Porto Alegre','(51) 5432-1098','Praia JKL','202','56789-012','Professor');