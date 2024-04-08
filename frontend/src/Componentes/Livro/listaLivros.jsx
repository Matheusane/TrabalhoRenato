import React, { useState, useEffect } from "react";
import LivroService from "../services/livroService";
import FormLivro from "./formLivro";
import FormFiltro from "./formFiltro";

const livroservice = new LivroService();

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [codigoLivroToDelete, setCodigoLivroToDelete] = useState(null);

  const carregaLivros = async () => {
    try {
      const dados = await livroservice.getAllLivros();
      setLivros(dados);
    } catch (error) {
      console.error('Erro ao carregar:', error);
    }
  };

  useEffect(() => {
    carregaLivros();
  }, []);

  const handleDelete = async (codigoLivro) => {
    setCodigoLivroToDelete(codigoLivro);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (codigoLivroToDelete) {
      await livroservice.deleteLivro(codigoLivroToDelete);
      await carregaLivros(); // Update the list of books after deletion
      setCodigoLivroToDelete(null);
    }
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setCodigoLivroToDelete(null);
    setShowConfirmation(false);
  };

  const handleEdit = async (cadlivro) => {
    setSelectedLivro(cadlivro);
  };

  const handleUpdate = async () => {
    await carregaLivros();
  };

  const handleUpdateFiltro = async (livroFiltro) => {
    setLivros(livroFiltro);
  };

  return (
    <div>
      <FormLivro selectedLivro={selectedLivro} onUpdate={handleUpdate} />
      <div className="formulario fundo">
        <FormFiltro onUpdate={handleUpdateFiltro} />
        {showConfirmation && (
          <div className="confirmation">
            <p>Deseja realmente excluir este livro?</p>
            <button className="btn btn-danger" onClick={confirmDelete}>
              Sim
            </button>
            <button className="btn btn-primary" onClick={cancelDelete}>
              Não
            </button>
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nome Livro</th>
              <th scope="col">Páginas</th>
              <th scope="col">Editora</th>
              <th scope="col">Gênero</th>
              <th scope="col">Data de Publicação</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((cadlivro) => (
              <tr key={cadlivro.codigoLivro}>
                <th scope="row">{cadlivro.codigoLivro}</th>
                <td>{cadlivro.NomeLivro}</td>
                <td>{cadlivro.numeroPagina}</td>
                <td>{cadlivro.editora.nome}</td>
                <td>{cadlivro.genero.descricao}</td>
                <td>{new Date(cadlivro.dataPublicacao).toLocaleDateString()}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(cadlivro.codigoLivro)}
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(cadlivro)}
                    className="btn btn-primary"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaLivros;
