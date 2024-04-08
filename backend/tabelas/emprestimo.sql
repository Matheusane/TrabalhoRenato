CREATE TABLE Emprestimo (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    IDLivro INT,
    IDUsuario VARCHAR(14),
    dEmprestimo DATE,
    dDevolucao DATE
);
