const Database = require("../database");

const banco = new Database()
class cadLivro {
   NomeLivro;
   codigoLivro;
   numeroPagina;
   editora;
   genero;
   dataPublicacao;
   constructor(NomeLivro, codigoLivro, numeroPagina, editora, genero, dataPublicacao) {
      this.NomeLivro = NomeLivro,
         this.codigoLivro = codigoLivro,
         this.numeroPagina = numeroPagina,
         this.editora = editora,
         this.genero = genero,
         this.dataPublicacao = dataPublicacao
   }

   async getALL() {
      const query = `
         SELECT
            cadlivro.NomeLivro,
            cadlivro.codigoLivro,
            cadlivro.numeroPagina,
            editoras.id as editora_id,
            editoras.nome as editora,
            generos.id AS genero_id,
            generos.descricao AS genero,
            cadlivro.dataPublicacao
         FROM
            cadlivro
         INNER JOIN
            generos ON cadlivro.genero = generos.descricao
         INNER JOIN
            editoras ON cadlivro.editora = editoras.nome;
      `;
   
      const livros = await banco.ExecutaComando(query);
   
      const livrosFormatados = livros.map(livro => ({
         NomeLivro: livro.NomeLivro,
         codigoLivro: livro.codigoLivro,
         numeroPagina: livro.numeroPagina,
         editora: {
            id: livro.editora_id,
            nome: livro.editora 
         },
         genero: {
            id: livro.genero_id,
            descricao: livro.genero
         },
         dataPublicacao: livro.dataPublicacao
      }));
   
      return livrosFormatados;
   }

   async create(dadosLivro) {
      await banco.ExecutaComandoNonQuery('insert into cadlivro set ?', dadosLivro)
   }

   async update(codigoLivro, dadosLivro) {
      await banco.ExecutaComando('update cadlivro set ? where codigolivro=?', [dadosLivro, codigoLivro])
   }

   async getById(codigoLivro) {
      const query = `
          SELECT
              cadlivro.NomeLivro,
              cadlivro.codigoLivro,
              cadlivro.numeroPagina,
              editoras.id as editora_id,
              editoras.nome AS editora,
              generos.id AS genero_id,
              generos.descricao AS genero,
              cadlivro.dataPublicacao
          FROM
              cadlivro
          INNER JOIN
              generos ON cadlivro.genero = generos.descricao
          INNER JOIN
              editoras ON cadlivro.editora = editoras.nome
          WHERE
              cadlivro.codigoLivro = ?;
      `;
      const result = await banco.ExecutaComando(query, [codigoLivro]);
      const livro = result[0]
      const livrosFormatados = {
         NomeLivro: livro.NomeLivro,
         codigoLivro: livro.codigoLivro,
         numeroPagina: livro.numeroPagina,
         editora: {
            id: livro.editora_id,
            nome: livro.editora 
         }, 
         genero: {
            id: livro.genero_id,
            descricao: livro.genero
         },
         dataPublicacao: livro.dataPublicacao
      };
   
      return livrosFormatados;
   }



   async delete(codigoLivro) {
      await banco.ExecutaComandoNonQuery('delete from cadlivro where codigoLivro=?', [codigoLivro])

   }
}

module.exports = cadLivro