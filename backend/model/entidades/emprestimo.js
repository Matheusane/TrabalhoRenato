const Database = require("../database");

const banco = new Database()

class Emprestimo {
    ID;
    IDLivro
    IDUsuario;
    dEmprestimo;
    dDevolucao


    constructor(ID, IDLivro, IDUsuario, dEmprestimo, dDevolucao) {
        this.ID = ID,
        this.IDLivro = IDLivro
        this.IDUsuario = IDUsuario
        this.dEmprestimo = dEmprestimo
        this.dDevolucao = dDevolucao    
    }



    async getAll() {
        const query = `
            SELECT
                emprestimo.ID,
                emprestimo.IDLivro,
                cadlivro.NomeLivro,
                emprestimo.IDUsuario,
                alunoprofessor.Nome as nomeUsuario,
                emprestimo.dEmprestimo,
                emprestimo.dDevolucao,
                cadlivro.codigoLivro,
                cadlivro.numeroPagina,
                editoras.id as editora_id,
                editoras.nome as editora,
                generos.id AS genero_id,
                generos.descricao as genero,
                cadlivro.dataPublicacao
            FROM
                emprestimo
            INNER JOIN
                cadlivro ON emprestimo.IDLivro = cadlivro.codigoLivro
            INNER JOIN
                generos ON cadlivro.genero = generos.descricao
            INNER JOIN
                editoras ON cadlivro.editora = editoras.nome
            INNER JOIN 
                alunoprofessor ON emprestimo.IDUsuario = alunoprofessor.cpf;
        `;
        
        const emprestimos = await banco.ExecutaComando(query);
     
        const emprestimosFormatados = emprestimos.map(emprestimo => ({
        
            
            ID: emprestimo.ID,
            dEmprestimo: emprestimo.dEmprestimo,
            dDevolucao:emprestimo.dDevolucao,
            livro: {
                codigoLivro: emprestimo.codigoLivro,
                NomeLivro: emprestimo.NomeLivro,
                numeroPagina: emprestimo.numeroPagina,
                editora: {
                    id: emprestimo.editora_id,
                    nome: emprestimo.editora 
                },
                genero: {
                    id: emprestimo.genero_id,
                    descricao: emprestimo.genero
                },
                dataPublicacao: emprestimo.dataPublicacao
            },
            alunoProfessor: {
                id: emprestimo.IDUsuario,
                nome: emprestimo.nomeUsuario
            },
        }));
     
        return emprestimosFormatados;
     }

    async getById(ID) {
        const result = await banco.ExecutaComando('select * from emprestimo WHERE ID = ?', [ID])
        const emprestimo = result[0];
        return emprestimo
    }

    async delete(ID) {
        await banco.ExecutaComandoNonQuery('delete from emprestimo where id=?', [ID])
    }


    async create(dadosEmprestimo) {
        await banco.ExecutaComandoNonQuery('insert into emprestimo set ?', dadosEmprestimo)
    }

    async update(ID, dadosEmprestimo) {
        await banco.ExecutaComando('update emprestimo set ? where id=?', [dadosEmprestimo, ID])
    }

    async getById({ IDLivro }) {
        const query = `
            SELECT
                emprestimo.ID,
                emprestimo.IDLivro,
                cadlivro.NomeLivro,
                emprestimo.IDUsuario,
                alunoprofessor.Nome,
                emprestimo.dEmprestimo,
                emprestimo.dDevolucao,
                cadlivro.codigoLivro,
                cadlivro.numeroPagina,
                editoras.id as editora_id,
                editoras.nome as editora,
                generos.id AS genero_id,
                generos.descricao as genero,
                cadlivro.dataPublicacao
            FROM
                emprestimo
            INNER JOIN
                cadlivro ON emprestimo.IDLivro = cadlivro.codigoLivro
            INNER JOIN
                generos ON cadlivro.genero = generos.descricao
            INNER JOIN
                editoras ON cadlivro.editora = editoras.nome
            INNER JOIN 
                alunoprofessor ON emprestimo.IDUsuario = alunoprofessor.cpf
            WHERE
                emprestimo.IDLivro LIKE '%${IDLivro}%';
        `;
        
        const emprestimos = await banco.ExecutaComando(query);
    
        const emprestimosFormatados = emprestimos.map(emprestimo => ({
            ID: emprestimo.ID,
            dEmprestimo: emprestimo.dEmprestimo,
            dDevolucao:emprestimo.dDevolucao,
            livro: {
                id: emprestimo.codigoLivro,
                NomeLivro: emprestimo.NomeLivro,
                numeroPagina: emprestimo.numeroPagina,
                editora: {
                    id: emprestimo.editora_id,
                    nome: emprestimo.editora 
                },
                genero: {
                    id: emprestimo.genero_id,
                    descricao: emprestimo.genero
                },
                dataPublicacao: emprestimo.dataPublicacao,
            alunoProfessor: {
                id: emprestimo.IDUsuario,
                nome: emprestimo.nome
            }
            },
        }));
     
        return emprestimosFormatados;
    }
    


}
module.exports = Emprestimo